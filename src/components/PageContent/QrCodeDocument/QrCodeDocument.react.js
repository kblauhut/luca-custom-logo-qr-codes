import React, {
    useRef,
    useMemo,
    useEffect,
    useCallback,
    useState,
    createContext,
} from "react";
import { jsPDF } from "jspdf";
import { message } from "antd";

import {
    MAX_QR_CODES_FILE,
    isLessOrEqual,
    browserSupportsQrCodeDownload,
    arrayChunk,
    createBatches,
} from "../../../constants/qrGeneration";

import { QrCodes } from "./QrCodes";
import { Wrapper, messageStyle } from "./QrCodeDocument.styled";

const Context = createContext({ name: "messageContext" });

const generateOneFile = ({ scanner, printReference, fileNumber }) => {
    return new Promise((resolve) => {
        const qrPDF = new jsPDF("p", "pt", "a4", true);
        let locationName = scanner.name || "Allgemein";

        locationName = fileNumber
            ? `${locationName}_${fileNumber}`
            : locationName;

        qrPDF.html(printReference.current, {
            callback: (pdf) => {
                pdf.save(locationName);
                resolve();
            },
            html2canvas: { scale: 0.8 },
        });
    });
};

export const QrCodeDocument = ({
    scanner,
    downloadTableQRCodes,
    isDownload,
    setIsDownload,
    img,
}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const printReference = useRef(null);
    const [qrData, setQrData] = useState([]);
    const [downloadStatus, setDownloadStatus] = useState({});

    const { tableCount } = scanner;

    const openMessage = useCallback(() => {
        messageApi.loading({
            content: (
                <Context.Consumer>
                    {({ current, total }) => `Progress ${current}/${total}`}
                </Context.Consumer>
            ),
            style: messageStyle,
            duration: 0,
        });
    }, [messageApi]);

    const qrDataChunked = useMemo(() => {
        const tables = [...new Array(tableCount).keys()].map((x) => x + 1);
        const tablesChunked = arrayChunk(tables, MAX_QR_CODES_FILE);
        return tablesChunked.map((tableChunk) => {
            return createBatches(
                tableChunk,
                "table",
                (number) => `Tisch ${number}`
            );
        });
    }, [tableCount]);

    const onDownLoad = useCallback(async () => {
        let fileNumber = 0;

        const downloadFunctionParameters = {
            downloadTableQRCodes,
            printReference,
            fileNumber,
            scanner,
        };

        if (!downloadTableQRCodes) {
            setDownloadStatus({ current: 1, total: 1 });
            await generateOneFile(downloadFunctionParameters);
            setIsDownload(false);
            return;
        }

        fileNumber = 1;
        setDownloadStatus({ current: fileNumber, total: qrDataChunked.length });
        // eslint-disable-next-line no-restricted-syntax
        for (const qrDataChunk of qrDataChunked) {
            setQrData(qrDataChunk);
            const sleep = (delay) =>
                new Promise((resolve) => setTimeout(resolve, delay));
            // eslint-disable-next-line no-await-in-loop
            await sleep(1000);
            // eslint-disable-next-line no-await-in-loop
            await generateOneFile({
                ...downloadFunctionParameters,
                fileNumber,
            });
            fileNumber += 1;
            setDownloadStatus({
                current: isLessOrEqual(fileNumber, qrDataChunked.length),
                total: qrDataChunked.length,
            });
        }
        setIsDownload(false);
    }, [downloadTableQRCodes, setIsDownload, qrDataChunked]);

    useEffect(() => {
        if (isDownload) {
            if (!browserSupportsQrCodeDownload()) {
                message.error({
                    content: `Please use a good browser...`,
                    style: messageStyle,
                    duration: 6,
                });
                setIsDownload(false);
                return;
            }
            openMessage();
        } else {
            message.destroy();
        }
    }, [isDownload, openMessage, setIsDownload]);

    useEffect(() => {
        if (isDownload && browserSupportsQrCodeDownload()) {
            onDownLoad();
        }
    }, [isDownload, onDownLoad]);

    return (
        <Context.Provider value={downloadStatus}>
            {contextHolder}
            <Wrapper>
                <div ref={printReference}>
                    <QrCodes
                        qrData={qrData}
                        scanner={scanner}
                        downloadTableQRCodes={downloadTableQRCodes}
                        img={img}
                    />
                </div>
            </Wrapper>
        </Context.Provider>
    );
};

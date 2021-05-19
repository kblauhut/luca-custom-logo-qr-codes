import React, { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "antd";

import { getScanner } from "../../../network/api";

import { Wrapper, Attribute } from "./GenerateQRCodes.styled";
import { QrCodeDocument } from "../QrCodeDocument";
export const GenerateQRCodes = ({ scannerAccessId, img }) => {
    const [generateLocationQrCode, setGenerateLocationQrCode] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    const {
        isLoading,
        error,
        data: scanner,
    } = useQuery(
        "scanner",
        () => getScanner(scannerAccessId).then((response) => response.json()),
        { retry: false }
    );

    if (isLoading || error) return null;

    return (
        <Wrapper>
            <Attribute>{`Location Name: ${scanner.name}`}</Attribute>
            <Attribute>{`Tischanzahl: ${scanner.tableCount}`}</Attribute>
            <Button
                type="primary"
                style={{ float: "right", marginBottom: 32, marginLeft: 12 }}
                onClick={() => {
                    setGenerateLocationQrCode(true);
                    setIsDownload(true);
                }}
            >
                Location Qr Code generieren
            </Button>
            <Button
                type="primary"
                style={{ float: "right", marginBottom: 32 }}
                onClick={() => {
                    setGenerateLocationQrCode(false);
                    setIsDownload(true);
                }}
            >
                Tisch Qr Codes generieren
            </Button>
            <QrCodeDocument
                isDownload={isDownload}
                setIsDownload={setIsDownload}
                scanner={scanner}
                downloadTableQRCodes={!generateLocationQrCode}
                img={img}
            />
        </Wrapper>
    );
};

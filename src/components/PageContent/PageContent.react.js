import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { GenerateQRCodes } from "./GenerateQRCodes";
import { Wrapper } from "./PageContent.styled";

const { Dragger } = Upload;

export const PageContent = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [scannerAccessId, setScannerAccessId] = useState(null);
    const onFinish = (values) => {
        setScannerAccessId(values.scannerAccessId);
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const props = {
        name: "file",
        multiple: false,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange(info) {
            const { status } = info.file;
            if (status === "uploading") {
                return;
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
                getBase64(info.file.originFileObj, (imageUrl) => {
                    setImageUrl(imageUrl);
                });
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload(file) {
            console.log(file.type);

            const isJpgOrPngOrSVG =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/svg+xml";
            if (!isJpgOrPngOrSVG) {
                message.error("You can only upload JPG/PNG/SVG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error("Image must smaller than 2MB!");
            }
            return isJpgOrPngOrSVG && isLt2M;
        },
        style: { marginBottom: 32 },
    };

    return (
        <Wrapper>
            {!scannerAccessId || !imageUrl ? (
                <>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibit from uploading company data or other band
                            files
                        </p>
                    </Dragger>
                    <Form
                        style={{ marginTop: 32 }}
                        onFinish={onFinish}
                        initialValues={{
                            scannerAccessId:
                                "98cfe143-59fc-48e9-b968-115621c52987",
                        }}
                    >
                        <Form.Item
                            name="scannerAccessId"
                            label="Scanner Access Id"
                        >
                            <Input placeholder="ScannerAccessId" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{ float: "right" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Erstellen
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <GenerateQRCodes
                    scannerAccessId={scannerAccessId}
                    img={imageUrl}
                />
            )}
        </Wrapper>
    );
};

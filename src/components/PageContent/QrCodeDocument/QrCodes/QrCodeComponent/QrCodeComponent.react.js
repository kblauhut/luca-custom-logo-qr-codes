import React from "react";
import QRCode from "qrcode.react";

import { WEB_APP_PATH } from "../../../../../constants/url";

import { bytesToBase64Url } from "../../../../../utils/encodings";

export const QrCodeComponent = ({ scannerId, valueKey, value, img }) => {
    const imageSettings = {
        src: img,
        x: null,
        y: null,
        height: 32 * 5,
        width: 32 * 8,
        excavate: true,
    };

    const sharedContentPart = `${WEB_APP_PATH}${scannerId}`;
    const additionalData =
        valueKey && value
            ? bytesToBase64Url(JSON.stringify({ [valueKey]: value }))
            : bytesToBase64Url(JSON.stringify({}));

    const qrCodeContent = `${sharedContentPart}#${additionalData}`;
    return (
        <QRCode
            value={qrCodeContent}
            size={800}
            imageSettings={imageSettings}
            level="M"
        />
    );
};

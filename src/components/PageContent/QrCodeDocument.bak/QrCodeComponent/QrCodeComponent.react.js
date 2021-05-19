import React from "react";
import QRCode from "qrcode.react";

import LucaLogo from "../../../../assets/LucaLogo.svg";
import { WEB_APP_PATH } from "../../../../constants/url";
import { bytesToBase64Url } from "../../../../utils/encodings";

export const QrCodeComponent = ({ scannerId, img }) => {
    const sharedContentPart = `${WEB_APP_PATH}${scannerId}`;
    const additionalData = bytesToBase64Url(JSON.stringify({}));

    const qrCodeContent = `${sharedContentPart}#${additionalData}`;

    return (
        <QRCode
            value={qrCodeContent}
            size={800}
            includeMargin={true}
            imageSettings={{
                src: img || LucaLogo,
                height: 32 * 5,
                width: 32 * 8,
                excavate: true,
            }}
            level="M"
        />
    );
};

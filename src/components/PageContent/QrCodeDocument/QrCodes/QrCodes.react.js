import React from "react";

import { TableQrCodes } from "./TableQrCodes";
import { LocationQrCode } from "./LocationQrCode";

export const QrCodes = ({ scanner, downloadTableQRCodes, qrData, img }) => {
    return (
        <>
            {downloadTableQRCodes ? (
                <TableQrCodes qrData={qrData} scanner={scanner} img={img} />
            ) : (
                <LocationQrCode scanner={scanner} img={img} />
            )}
        </>
    );
};

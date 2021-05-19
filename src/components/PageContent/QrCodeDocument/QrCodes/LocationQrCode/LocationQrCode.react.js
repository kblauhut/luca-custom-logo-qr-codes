import React from "react";

import { QrCodeComponent } from "../QrCodeComponent";
import { Row, Item, Text } from "../../QrCodeDocument.styled";

export const LocationQrCode = ({ scanner, img }) => {
    return (
        <Row>
            <Item>
                <Text style={{ marginBottom: 20 }}>{scanner.name}</Text>
                <QrCodeComponent scannerId={scanner.scannerId} img={img} />
                <Text style={{ marginTop: 15 }}>Scannen und einchecken</Text>
            </Item>
        </Row>
    );
};

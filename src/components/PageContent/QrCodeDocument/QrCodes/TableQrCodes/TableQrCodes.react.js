import React from "react";

import { QrCodeComponent } from "../QrCodeComponent";
import { Row, Item, Text } from "../../QrCodeDocument.styled";

export const TableQrCodes = ({ scanner, qrData, img }) => {
    return (
        <>
            {qrData.map((rows) => (
                <Row key={rows.rowIndex}>
                    {rows.qrCodes.map(({ key, value, title }) => {
                        return (
                            <Item key={value}>
                                <Text style={{ marginBottom: 20 }}>
                                    {title}
                                </Text>
                                <QrCodeComponent
                                    scannerId={scanner.scannerId}
                                    valueKey={key}
                                    value={value}
                                    img={img}
                                />

                                <Text style={{ marginTop: 15 }}>
                                    Scannen und einchecken
                                </Text>
                            </Item>
                        );
                    })}
                </Row>
            ))}
        </>
    );
};

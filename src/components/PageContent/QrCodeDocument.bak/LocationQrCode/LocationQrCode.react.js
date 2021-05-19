import React from 'react';

import { Row, Item, Text } from '../QrCodeDocument.styled';
import { QrCodeComponent } from '../QrCodeComponent';
export const LocationQrCode = ({ scanner, img }) => {
  return (
    <Row>
      <Item>
        <Text style={{ marginBottom: 20 }}>{scanner.name}</Text>
        <QrCodeComponent scannerId={scanner.scannerId} img={img} />
        <Text style={{ marginTop: 15 }}>Gemeinsam erleben.</Text>
      </Item>
    </Row>
  );
};

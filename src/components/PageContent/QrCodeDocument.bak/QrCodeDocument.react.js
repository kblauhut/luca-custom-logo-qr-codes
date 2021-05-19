import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from 'antd';

import { getScanner } from '../../../network/api';

import { Wrapper, Attribute } from './QrCodeDocument.styled';
import { LocationQrCode } from './LocationQrCode';
export const QrCodeDocument = ({ scannerAccessId, img }) => {
  const [generateLocationQrCode, setGenerateLocationQrCode] = useState(false);
  const { isLoading, error, data: scanner } = useQuery(
    'scanner',
    () => getScanner(scannerAccessId).then((response) => response.json()),
    { retry: false }
  );

  if (isLoading || error) return null;

  return (
    <Wrapper>
      <Attribute>{`Location Name: ${scanner.name}`}</Attribute>
      <Attribute>{`Tischanzahl: ${scanner.tableCount}`}</Attribute>
      <Button
        type='primary'
        style={{ float: 'right', marginBottom: 32 }}
        onClick={() => setGenerateLocationQrCode(true)}
      >
        Location Qr Code generieren
      </Button>
      {generateLocationQrCode && <LocationQrCode scanner={scanner} img={img} />}
    </Wrapper>
  );
};

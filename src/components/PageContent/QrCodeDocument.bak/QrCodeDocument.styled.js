import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 32px 0;
`;

export const Attribute = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 263px;
`;

export const Item = styled.div`
  align-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  flex: 32%;
  display: flex;
  flex-direction: column;
  padding: 16px 0px;
  border: 0.5px solid rgb(225, 225, 225);

  & > canvas {
    width: 132px !important;
    height: 132px !important;
  }
`;

export const Text = styled.p`
  margin: 0;

  text-align: center;

  font-size: 9px;
  font-family: Montserrat-Bold, sans-serif;
  font-weight: bold;

  width: 120px;
`;

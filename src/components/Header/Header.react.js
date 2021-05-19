import React from 'react';

// Components
import LucaLogo from '../../assets/LucaLogo.svg';
import { SubTitle, HeaderWrapper, Logo } from './Header.styled';

// Assets

const HeaderRaw = ({ title }) => {
  return (
    <HeaderWrapper>
      <Logo src={LucaLogo} />
      <SubTitle>{title}</SubTitle>
    </HeaderWrapper>
  );
};

export const Header = React.memo(HeaderRaw);

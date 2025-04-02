import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';

const HeaderContainer = styled.header`
  ${props => props.theme.mixins.fullWidth}
  background-color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  box-shadow: ${props => props.theme.shadows.medium};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navigation />
    </HeaderContainer>
  );
};

export default Header;

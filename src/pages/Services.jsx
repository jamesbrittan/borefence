import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Services = () => {
  return (
    <ServicesContainer>
      <h1>Our Services</h1>
      <p>Coming soon...</p>
    </ServicesContainer>
  );
};

export default Services;

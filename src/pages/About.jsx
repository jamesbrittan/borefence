import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const About = () => {
  return (
    <AboutContainer>
      <h1>About Bore Fence</h1>
      <p>Coming soon...</p>
    </AboutContainer>
  );
};

export default About;

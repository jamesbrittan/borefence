import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <h1>Contact Us</h1>
      <p>Coming soon...</p>
    </ContactContainer>
  );
};

export default Contact;

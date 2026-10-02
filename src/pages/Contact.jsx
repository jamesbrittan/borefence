import styled from 'styled-components';
import { QuoteRequestSection } from '../components/QuoteRequest';

const ContactContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
`;

const Contact = () => {
  return (
    <ContactContainer>
      <title>Contact us | BoreFence</title>
      <QuoteRequestSection headingLevel="h1" />
    </ContactContainer>
  );
};

export default Contact;

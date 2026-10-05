import styled from 'styled-components';
import { QuoteRequestSection } from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import { business } from '../business/details';

const ContactContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
`;

const Contact = () => {
  return (
    <ContactContainer>
      <PageMeta
        title="Contact us"
        description={`Get a free quote from ${business.name} for fencing, railings, gates and sheds. Call ${business.phones[0].display} or send us a message.`}
      />
      <QuoteRequestSection headingLevel="h1" />
    </ContactContainer>
  );
};

export default Contact;

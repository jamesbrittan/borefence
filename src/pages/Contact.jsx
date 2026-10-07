import styled from 'styled-components';
import { MAIN_CONTENT_ID } from '../components/SkipLink';
import { QuoteRequestSection } from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import { business, telHref, postcodeList } from '../business/details';

const ContactContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
`;

const Intro = styled.section`
  ${props => props.theme.mixins.container}
  padding-block: ${props => props.theme.spacing.section} ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  ${props => props.theme.typography.h1}
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Lead = styled.p`
  ${props => props.theme.typography.lead}
  max-width: 60ch;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

// Phone, mobile and email as tappable cards: the quickest ways to get in touch
const Methods = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const Method = styled.li`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  padding: ${props => props.theme.spacing.card};
`;

const MethodLabel = styled.p`
  margin: 0 0 ${props => props.theme.spacing.xxs};
  ${props => props.theme.typography.label}
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MethodLink = styled.a`
  ${props => props.theme.typography.lead}
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Area = styled.p`
  margin: ${props => props.theme.spacing.lg} 0 0;
  color: ${props => props.theme.colors.textLight};
`;

const Contact = () => {
  return (
    <ContactContainer id={MAIN_CONTENT_ID} tabIndex={-1}>
      <PageMeta
        title="Contact us"
        description={`Get a free quote from ${business.name} for fencing, railings, gates and sheds. Call ${business.phones[0].display} or send us a message.`}
      />

      <Intro aria-labelledby="contact-title">
        <Title id="contact-title">Contact us</Title>
        <Lead>Call or email us, or send the form below for a free quote.</Lead>
        <Methods>
          {business.phones.map((phone) => (
            <Method key={phone.international}>
              <MethodLabel>{phone.label}</MethodLabel>
              <MethodLink href={telHref(phone)}>{phone.display}</MethodLink>
            </Method>
          ))}
          <Method>
            <MethodLabel>Email</MethodLabel>
            <MethodLink href={`mailto:${business.email}`}>{business.email}</MethodLink>
          </Method>
        </Methods>
        <Area>
          {`Based in ${business.area.base}, covering the ${postcodeList()} postcodes and ${business.area.region}.`}
        </Area>
      </Intro>

      <QuoteRequestSection />
    </ContactContainer>
  );
};

export default Contact;

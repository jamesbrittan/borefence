import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { business, telHref, postcodeList } from '../../business/details';
import { services, servicePath } from '../../catalogue/services';

// Off-white on navy: 9.6:1 contrast, set explicitly rather than with opacity
const FOOTER_TEXT = '#E6ECF3';

const FooterContainer = styled.footer`
  ${props => props.theme.mixins.fullWidth}
  background-color: ${props => props.theme.colors.primary};
  color: ${FOOTER_TEXT};
  padding-top: ${props => props.theme.spacing.section};
`;

const FooterContent = styled.div`
  ${props => props.theme.mixins.container}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const FooterTitle = styled.h2`
  ${props => props.theme.typography.h3}
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.md};
`;

// Every column is a list, so all items share one rhythm
const FooterList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ContactItem = styled.li`
  display: flex;
  flex-direction: column;
`;

// "Phone", "Mobile", "Email": small and muted, so the numbers stand out
const ContactLabel = styled.span`
  ${props => props.theme.typography.small}
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterLink = styled.a`
  ${props => props.theme.typography.nav}
  color: ${props => props.theme.colors.white};
  text-decoration: underline;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.white};
    text-decoration-thickness: 2px;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const ContactValue = styled(FooterLink)`
  ${props => props.theme.typography.lead}
  font-weight: ${props => props.theme.fonts.weights.semiBold};
`;

const Area = styled.p`
  margin: ${props => props.theme.spacing.md} 0 0;
  ${props => props.theme.typography.small}
`;

const BottomBar = styled.div`
  ${props => props.theme.mixins.container}
  margin-top: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.lg};
  ${props => props.theme.typography.small}

  /* The line sits on the text, so it spans the content width, not the gutter */
  p {
    margin: 0;
    padding-top: ${props => props.theme.spacing.lg};
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent>
        <section aria-labelledby="footer-contact">
          <FooterTitle id="footer-contact">Contact Us</FooterTitle>
          <FooterList>
            {business.phones.map((phone) => (
              <ContactItem key={phone.international}>
                <ContactLabel>{phone.label}</ContactLabel>
                <ContactValue href={telHref(phone)}>{phone.display}</ContactValue>
              </ContactItem>
            ))}
            <ContactItem>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href={`mailto:${business.email}`}>{business.email}</ContactValue>
            </ContactItem>
          </FooterList>
          <Area>{`Covering ${business.area.base}, the ${postcodeList()} postcodes and ${business.area.region}.`}</Area>
        </section>

        <nav aria-labelledby="footer-services">
          <FooterTitle id="footer-services">Services</FooterTitle>
          <FooterList>
            {services.map((service) => (
              <li key={service.slug}>
                <FooterLink as={Link} to={servicePath(service)}>{service.name}</FooterLink>
              </li>
            ))}
          </FooterList>
        </nav>
      </FooterContent>

      <BottomBar>
        <p>{`© ${year} ${business.legalName}. Trade Waste Licence ${business.wasteLicence.number}.`}</p>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;

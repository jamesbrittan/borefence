import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { business, telHref } from '../../business/details';
import { services, servicePath } from '../../catalogue/services';

const FooterContainer = styled.footer`
  ${props => props.theme.mixins.fullWidth}
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.section} 0 ${props => props.theme.spacing.xl};
`;

const FooterContent = styled.div`
  ${props => props.theme.mixins.container}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: ${props => props.theme.spacing.xl};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: 1.25rem;
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.white};
  opacity: 0.9;
  line-height: 1.6;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.white};
  text-decoration: underline;
  text-underline-offset: 3px;

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

const FooterList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
  
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          {business.phones.map((phone) => (
            <FooterText key={phone.international}>
              {phone.label}: <FooterLink href={telHref(phone)}>{phone.display}</FooterLink>
            </FooterText>
          ))}
          <FooterText>
            Email: <FooterLink href={`mailto:${business.email}`}>{business.email}</FooterLink>
          </FooterText>
        </FooterSection>

        <FooterSection as="nav" aria-label="Services">
          <FooterTitle>Services</FooterTitle>
          <FooterList>
            {services.map((service) => (
              <li key={service.slug}>
                <FooterText as="span">
                  <FooterLink as={Link} to={servicePath(service)}>{service.name}</FooterLink>
                </FooterText>
              </li>
            ))}
          </FooterList>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

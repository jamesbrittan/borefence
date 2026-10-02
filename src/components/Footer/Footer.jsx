import styled from 'styled-components';
import { business, telHref } from '../../business/details';

const FooterContainer = styled.footer`
  ${props => props.theme.mixins.fullWidth}
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
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
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

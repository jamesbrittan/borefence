import styled from 'styled-components';

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
          <FooterText>Phone: <FooterLink href="tel:+441633526247">01633 526 247</FooterLink></FooterText>
          <FooterText>Mobile: <FooterLink href="tel:+447780002247">07780 002247</FooterLink></FooterText>
          <FooterText>Email: <FooterLink href="mailto:karen.howell@borefence.co.uk">karen.howell@borefence.co.uk</FooterLink></FooterText>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

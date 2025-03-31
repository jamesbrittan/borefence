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

const FooterTitle = styled.h3`
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


const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
  
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>Phone: 01633 526 247</FooterText>
          <FooterText>Mobile: 07780 002247</FooterText>
          <FooterText>Email: karen.howell@borefence.co.uk</FooterText>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

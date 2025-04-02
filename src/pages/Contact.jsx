import styled from 'styled-components';
import ContactForm from '../components/ContactForm/ContactForm';

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ContactContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  overflow-x: hidden;
  ${fadeIn}
`;

const FullWidthSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
`;

const ContactWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding-top: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  animation: fadeIn 1s ease-out forwards;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}40,
      transparent
    );
  }
`;

const ContactSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.component.padding.default};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <FullWidthSection>
        <ContactWrapper>
          <ContactSection>
            <ContactForm dark={false} />
          </ContactSection>
        </ContactWrapper>
      </FullWidthSection>
    </ContactContainer>
  );
};

export default Contact;

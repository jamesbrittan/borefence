import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageUrl } from '../utils/imageUtils';
import ContactForm from '../components/ContactForm/ContactForm';

const ServiceContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  overflow-x: hidden;
`;

const FullWidthSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
`;

const HeaderSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  padding: ${props => props.theme.spacing.xxl} 0 ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  width: 100%;
  justify-content: space-between;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderImage = styled.img`
  width: 400px;
  height: 280px;
  object-fit: cover;
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 500px;
    height: auto;
    aspect-ratio: 3/2;
  }
`;

const Title = styled.h1`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.spacing.xxl};
  margin: 0;
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    margin-top: ${props => props.theme.spacing.md};
    
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      margin: ${props => props.theme.spacing.md} auto 0;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  padding: ${props => props.theme.spacing.section.padding.default};
  background-color: ${props => props.theme.colors.background};
`;

const Description = styled.div`
  ${props => props.theme.typography.body}
  max-width: 800px;
  margin: 0 auto;
  
  p {
    margin-bottom: ${props => props.theme.spacing.lg};
    line-height: 1.6;
  }
  
  p:first-of-type {
    font-size: 1.1rem;
    padding-left: ${props => props.theme.spacing.md};
    border-left: 3px solid ${props => props.theme.colors.primary};
  }
`;

const ContactWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding-top: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.section.padding.large};
  
  &::before {
    content: '';
    display: block;
    height: 6px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryLight}
    );
    margin-bottom: ${props => props.theme.spacing.xl};
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
`;

const ServicePage = ({ title, description, image, children }) => {
  const imageUrl = getImageUrl(image.split('/').pop());
  
  return (
    <ServiceContainer>
      <FullWidthSection>
        <HeaderSection>
          <ServiceHeader>
            <HeaderImage src={imageUrl} alt={title} />
            <Title>{title}</Title>
          </ServiceHeader>
        </HeaderSection>
      </FullWidthSection>
      
      <FullWidthSection>
        <ContentSection>
          <Description>
            {description}
          </Description>
          {children}
        </ContentSection>
      </FullWidthSection>
      
      <FullWidthSection>
        <ContactWrapper>
          <ContactSection>
            <ContactForm dark={false} />
          </ContactSection>
        </ContactWrapper>
      </FullWidthSection>
    </ServiceContainer>
  );
};

ServicePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  children: PropTypes.node,
};

export default ServicePage;

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageUrl } from '../utils/imageUtils';
import ContactForm from '../components/ContactForm/ContactForm';
import ServiceGallery from '../components/ServiceGallery';


const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ServiceContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  overflow-x: hidden;
  ${fadeIn}
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
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.colors.background},
      transparent
    );
    opacity: 0.6;
    z-index: -1;
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  width: 100%;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.medium};
  flex-direction: row-reverse;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.8s ease-out forwards;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    text-align: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.lg};
  }
`;

const GalleryWrapper = styled.div`
  flex: 1;
  transition: transform 0.5s ease;
  position: relative;
  overflow: visible;
  border-radius: ${props => props.theme.radius.medium};
  
  &:hover {
    transform: scale(1.01);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

const TitleSection = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: ${props => props.theme.spacing.xl};
  animation: fadeIn 0.6s ease-out forwards;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: left;
    padding: ${props => props.theme.spacing.md};
  }
`;

const Title = styled.h1`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.primary};
  font-size: calc(${props => props.theme.spacing.xxl} * 1.4);
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  position: relative;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${props => props.theme.spacing.xs};
    left: 0;
    width: 140px;
    height: 3px;
    background: linear-gradient(
      to left,
      ${props => props.theme.colors.primaryLight},
      ${props => props.theme.colors.primary}
    );
    transition: width 0.3s ease;
    
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  &:hover::after {
    width: 160px;
  }
`;

const Description = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin: ${props => props.theme.spacing.sm} 0;
  line-height: 1.8;
  position: relative;
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  padding: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.md};
  animation: fadeIn 1s ease-out forwards;
`;

const ContactWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding-top: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.xxl};
  margin-top: ${props => props.theme.spacing.xxl};
  position: relative;
  animation: fadeIn 1.2s ease-out forwards;
  
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

// Helper function to wrap parts of text in strong tags
const enhanceDescription = (text) => {
  // Check if text is defined and is a string
  if (!text || typeof text !== 'string') return '';
  
  // Find the first sentence or important phrases to highlight
  const words = text.split(' ');
  if (words.length <= 5) return text;
  
  // Highlight first 2-3 important words
  const importantWords = words.slice(0, 2).join(' ');
  const restOfText = words.slice(2).join(' ');
  
  return <><strong>{importantWords}</strong> {restOfText}</>;
};

const ServicePage = ({ title, description, image, children }) => {
  const imageUrl = getImageUrl(image.split('/').pop());
  const serviceType = title.toLowerCase();
  
  return (
    <ServiceContainer>
      <FullWidthSection>
        <HeaderSection>
          <ServiceHeader>
            <TitleSection>
              <Title>{title}</Title>
              <Description>{enhanceDescription(description)}</Description>
            </TitleSection>
            <GalleryWrapper>
              <ServiceGallery 
                serviceName={serviceType}
                defaultImage={imageUrl}
              />
            </GalleryWrapper>
          </ServiceHeader>
        </HeaderSection>
      </FullWidthSection>
      
      <FullWidthSection>
        <ContentSection>
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
  children: PropTypes.node
};

export default ServicePage;

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageUrl } from '../utils/imageUtils';
import ContactForm from '../components/ContactForm/ContactForm';
import ServiceGallery from '../components/ServiceGallery';

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
  position: relative;
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
  box-shadow: ${props => props.theme.shadows.small};
  flex-direction: row-reverse;
  
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

const Title = styled.h1`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.primary};
  font-size: calc(${props => props.theme.spacing.xxl} * 1.3);
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  position: relative;
  font-weight: 700;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${props => props.theme.spacing.xs};
    left: 0;
    width: 140px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
    
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  margin-top: ${props => props.theme.spacing.sm};
  max-width: 90%;
`;

const GalleryWrapper = styled.div`
  flex: 1;
  transition: transform 0.3s ease;
  
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
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: left;
    padding: ${props => props.theme.spacing.md};
  }
`;

const Description = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin: ${props => props.theme.spacing.sm} 0;
  line-height: 1.8;
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  padding: ${props => props.theme.spacing.section.padding.default};
  background-color: ${props => props.theme.colors.background};
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
            <TitleSection>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </TitleSection>
            <GalleryWrapper>
              <ServiceGallery 
                serviceName={title.toLowerCase()}
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
  image: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ServicePage;

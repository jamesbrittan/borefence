import styled from 'styled-components';
import { imageSrc } from '../../images';
import { services, servicePath } from '../../catalogue/services';
import { Link } from 'react-router-dom';
import { css } from 'styled-components';

const HERO_IMAGE = 'fence_brown_h.jpg';

// Dark tinted glass shared by the quote form and the service links. Opaque
// enough that white text keeps 4.5:1 contrast even over pure white sky.
const smokedGlass = css`
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(15px) saturate(160%);
  -webkit-backdrop-filter: blur(15px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const StyledHeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 68vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2; // updated z-index to 2

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('${props => props.backgroundImage || imageSrc(HERO_IMAGE, { width: 1920 })}');
    background-size: cover;
    background-position: center;
    filter: brightness(1.15) contrast(1.05);
    z-index: 1;

    /* Smaller hero downloads on smaller screens */
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      background-image: url('${props => props.backgroundImage || imageSrc(HERO_IMAGE, { width: 1280 })}');
    }

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      background-image: url('${props => props.backgroundImage || imageSrc(HERO_IMAGE, { width: 800 })}');
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.35) 30%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.05) 100%
    );
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.4) 25%,
        rgba(0, 0, 0, 0.2) 75%,
        rgba(0, 0, 0, 0.05) 100%
      );
    }
    
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  ${props => props.theme.mixins.container}
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${props => props.theme.spacing.section};
  /* Extra bottom space for the "Our product" card, which overlaps the hero by 2rem */
  padding-block: ${props => props.theme.spacing.section} calc(${props => props.theme.spacing.section} + 2rem);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroTextContent = styled.div`
  /* Size to the text, so the accent bar doesn't stretch to the form's height */
  align-self: start;
  padding-left: ${props => props.theme.spacing.xl};
  position: relative;
  transform: translateY(-10px);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.colors.accent},
      ${props => props.theme.colors.primaryLight}
    );
    border-radius: ${props => props.theme.radius.small};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
    margin: 0 auto;
    padding-left: 0;
    padding-bottom: ${props => props.theme.spacing.lg};
    
    &::before {
      width: 100%;
      height: 4px;
      left: 0;
      top: auto;
      bottom: 0;
      background: linear-gradient(
        to right,
        ${props => props.theme.colors.accent},
        ${props => props.theme.colors.primaryLight}
      );
    }
  }
`;

const HeroTitle = styled.h1`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.HeroTitle};
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.accent},
      ${props => props.theme.colors.primaryLight}
    );
    margin-top: ${props => props.theme.spacing.md};
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      margin: ${props => props.theme.spacing.md} auto 0;
    }
  }
`;

const HeroSubtitle = styled.p`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.subtitle};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.white};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  max-width: 700px;
  position: relative;
`;

const HeroDescription = styled.p`
  ${props => props.theme.typography.body}
  font-size: ${props => props.theme.fonts.size.lg};
  color: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
`;


const ServiceLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  ${smokedGlass}
  border-radius: ${props => props.theme.radius.medium};
  width: fit-content;
  max-width: 90%;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ServiceLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ServiceLinksList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* Spacing instead of separators, so a wrapped line never starts with one */
  gap: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.md};
`;

const ServiceLinkItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ServiceLinksPrompt = styled.span`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fonts.size.md};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  margin-bottom: ${props => props.theme.spacing.xxs};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

const ServiceLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: ${props => props.theme.fonts.size.sm};
  text-decoration: none;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  transition: color 0.2s ease;
  padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.radius.small};
  letter-spacing: 0.01em;

  
  &:hover, &:focus {
    color: ${props => props.theme.colors.white};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const FormColumn = styled.div`
  max-width: 400px;
  ${smokedGlass}
  padding: ${props => props.theme.spacing.cardLarge} ${props => props.theme.spacing.card};
  border-radius: ${props => props.theme.radius.large};
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1);
  justify-self: end;
  transform: translateY(-10px);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-self: center;
    max-width: 500px;
    width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${props => props.theme.spacing.card};
    transform: translateY(0);
  }
`;

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  backgroundImage,
  rightColumnContent,
  showServiceLinks = false
}) => {
  return (
    <StyledHeroSection backgroundImage={backgroundImage}>
      <HeroContent>
        <HeroTextContent>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
          {description && <HeroDescription>{description}</HeroDescription>}
          
          {showServiceLinks && (
            <ServiceLinksContainer>
              <ServiceLinksPrompt>Explore our services:</ServiceLinksPrompt>
              <ServiceLinksWrapper>
                <ServiceLinksList>
                  {services.map((service) => (
                    <ServiceLinkItem key={service.slug}>
                      <ServiceLink to={servicePath(service)}>{service.name}</ServiceLink>
                    </ServiceLinkItem>
                  ))}
                </ServiceLinksList>
              </ServiceLinksWrapper>
            </ServiceLinksContainer>
          )}
        </HeroTextContent>
        {rightColumnContent && (
          <FormColumn>
            {rightColumnContent}
          </FormColumn>
        )}
      </HeroContent>
    </StyledHeroSection>
  );
};

export default HeroSection;

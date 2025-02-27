import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../utils/imageUtils';

const StyledHeroSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('${props => props.backgroundImage ? props.backgroundImage : getImageUrl('fence_brown_h.jpg')}');
    background-size: cover;
    background-position: center;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      145deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.2) 75%,
      rgba(0, 0, 0, 0.1) 100%
    );
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.4) 25%,
        rgba(0, 0, 0, 0.2) 75%,
        rgba(0, 0, 0, 0.1) 100%
      );
    }
    
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.xxl} 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroTextContent = styled.div`
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
  font-size: 3.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.2;
  text-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  
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
  ${props => props.theme.typography.body}
  font-size: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.5;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-weight: ${props => props.theme.fonts.weights.medium};
`;

const HeroText = styled.p`
  ${props => props.theme.typography.body}
  font-size: ${props => props.theme.spacing.md};
  max-width: 600px;
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.95;
  line-height: 1.6;
  font-weight: ${props => props.theme.fonts.weights.medium};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const FormColumn = styled.div`
  max-width: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px) saturate(160%);
  -webkit-backdrop-filter: blur(15px) saturate(160%);
  padding: ${props => props.theme.spacing.component.padding.large} ${props => props.theme.spacing.component.padding.default};
  border-radius: ${props => props.theme.radius.large};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1);
  justify-self: end;
  transform: translateY(-10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 
      0 12px 36px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.15),
      0 6px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-self: center;
  }
`;

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  backgroundImage,
  rightColumnContent
}) => {
  return (
    <StyledHeroSection backgroundImage={backgroundImage}>
      <HeroContent>
        <HeroTextContent>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
          {description && <HeroText>{description}</HeroText>}
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

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  backgroundImage: PropTypes.string,
  rightColumnContent: PropTypes.node
};

export default HeroSection;

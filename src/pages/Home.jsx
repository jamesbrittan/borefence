import styled from 'styled-components';
import { getImageUrl } from '../utils/imageUtils';
import ContactForm from '../components/ContactForm/ContactForm';
import Guarantee from '../components/Guarantee/Guarantee';
import DesignOptions from '../components/DesignOptions/DesignOptions';

const HomeContainer = styled.main`
  width: 100vw;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
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
    background-image: url('${getImageUrl('fence_brown_h.jpg')}');
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
  max-width: 600px;
  position: relative;
  z-index: 3;
  padding-left: ${props => props.theme.spacing.lg};
  position: relative;
  
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

const FormWrapper = styled.div`
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

  h3 {
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-weight: ${props => props.theme.fonts.weights.semiBold};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-self: center;
    width: 100%;
    transform: translateY(0);
    margin-top: ${props => props.theme.spacing.lg};
    
    &:hover {
      transform: translateY(0);
    }
  }
`;

const CTAButton = styled.button`
  ${props => props.theme.typography.body}
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  cursor: pointer;
  transition: transform 0.2s;
  font-size: ${props => props.theme.spacing.md};

  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.theme.colors.secondary};
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: center;
  }
`;

const GuaranteeWrapper = styled.div`
  ${props => props.theme.mixins.fullWidth}
  position: relative;
  margin-top: -${props => props.theme.spacing.lg};
  z-index: 2;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.border},
      transparent
    );
    margin-top: ${props => props.theme.spacing.xl};
  }
`;

const Features = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  padding: ${props => props.theme.spacing.section.padding.default};
  background-color: ${props => props.theme.colors.white};
  position: relative;
  
  &::before {
    content: '';
    display: block;
    height: 6px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryLight}
    );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const FeaturesInner = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const FeatureCard = styled.article`
  text-align: center;
  padding: ${props => props.theme.spacing.component.padding.default};
  border-radius: ${props => props.theme.radius.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  h3 {
    ${props => props.theme.typography.h3}
    color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.md} 0;
    font-size: ${props => props.theme.spacing.lg};
    line-height: 1.3;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background-color: ${props => props.theme.colors.accent};
      margin: ${props => props.theme.spacing.xs} auto 0;
    }
  }

  p {
    ${props => props.theme.typography.body}
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${props => props.theme.colors.border},
    transparent
  );
  margin: ${props => props.theme.spacing.lg} 0;
`;

const DesignWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    display: block;
    height: 6px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primaryLight},
      ${props => props.theme.colors.primary}
    );
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTextContent>
            <HeroTitle>Reimagine Your Landscape with Bore Fence</HeroTitle>
            <HeroSubtitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</HeroSubtitle>
            <HeroText>
              Transform your outdoor space with our quality fencing, decking, and landscaping solutions tailored to your needs.
            </HeroText>
          </HeroTextContent>
          <FormWrapper>
            <ContactForm dark={true} />
          </FormWrapper>
        </HeroContent>
      </HeroSection>

      <GuaranteeWrapper>
        <Guarantee />
      </GuaranteeWrapper>

      <Features aria-labelledby="features-title">
        <FeaturesInner>
          <FeatureCard>
            <h3>Quality Materials</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Expert Installation</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Custom Solutions</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </FeatureCard>
        </FeaturesInner>
      </Features>

      <DesignWrapper>
        <DesignOptions />
      </DesignWrapper>
    </HomeContainer>
  );
};

export default Home;

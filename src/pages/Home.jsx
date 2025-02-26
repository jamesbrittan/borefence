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
  color: white;
  overflow: hidden;

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
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  ${props => props.theme.mixins.container}
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  padding: 4rem 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const HeroTextContent = styled.div`
  max-width: 600px;
`;

const HeroText = styled.p`
  ${props => props.theme.typography.body}
  font-size: 1.125rem;
  max-width: 600px;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

const FormWrapper = styled.div`
  max-width: 400px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  justify-self: end;

  h3 {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    font-weight: ${props => props.theme.fonts.weights.semiBold};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-self: center;
    width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const CTAButton = styled.button`
  ${props => props.theme.typography.body}
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: ${props => props.theme.radius.medium};
  cursor: pointer;
  transition: transform 0.2s;
  font-size: 1rem;

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
  margin-top: -2rem;
  z-index: 2;
`;

const Features = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.white};
`;

const FeaturesInner = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.article`
  text-align: center;
  padding: 2rem;

  h3 {
    ${props => props.theme.typography.h3}
    color: ${props => props.theme.colors.primary};
    margin: 1rem 0;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  p {
    ${props => props.theme.typography.body}
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTextContent>
            <HeroTitle>Reimagine Your Landscape with BoreFence</HeroTitle>
            <HeroSubtitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</HeroSubtitle>
          </HeroTextContent>
          <FormWrapper>
            <ContactForm />
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

      <DesignOptions />
    </HomeContainer>
  );
};

export default Home;

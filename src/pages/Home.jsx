import React from 'react';
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
  height: 60vh;
  width: 100%;
  background-image: url('${getImageUrl('fence_brown_h.jpg')}');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  position: relative;
  z-index: 1;
  padding: 4rem 0;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    align-items: center;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  ${props => props.theme.typography.heading}
  font-size: 3.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  line-height: 1.2;
  margin-bottom: 1rem;
  max-width: 800px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const HeroSubtitle = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fonts.weights.medium};
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.4;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
    text-align: center;
  }
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

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    justify-content: center;
  }
`;

const GuaranteeWrapper = styled.div`
  ${props => props.theme.mixins.fullWidth}
  position: relative;
  margin-top: -8rem;
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
            <HeroTitle>Transform Your Garden with BoreFence</HeroTitle>
            <HeroSubtitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</HeroSubtitle>
            <HeroText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </HeroText>
            <CTAButton>Get a Free Quote</CTAButton>
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

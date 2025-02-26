import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm/ContactForm';

const ServiceContainer = styled.main`
  width: 100vw;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 6rem 0;
  position: relative;
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.container}
  padding: 4rem 0;
`;

const Title = styled.h1`
  ${props => props.theme.typography.h1}
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Description = styled.div`
  ${props => props.theme.typography.body}
  max-width: 800px;
  margin: 0 auto;
  
  p {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const ContactSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 4rem 0;
  
  ${props => props.theme.mixins.container}
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServicePage = ({ title, description, image }) => {
  return (
    <ServiceContainer>
      <HeroSection>
        <Title>{title}</Title>
      </HeroSection>
      
      <ContentSection>
        <Description>
          {description}
        </Description>
      </ContentSection>

    </ServiceContainer>
  );
};

export default ServicePage;

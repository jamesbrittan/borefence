import React from 'react';
import styled from 'styled-components';
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
  padding: 4.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
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
  font-size: 2.5rem;
  margin: 0;
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    margin-top: 1rem;
    
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      margin: 1rem auto 0;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 1.5rem;
  }
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  padding: 3.5rem 0;
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
    padding-left: 1rem;
    border-left: 3px solid ${props => props.theme.colors.primary};
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
  margin: 2rem 0;
`;

const ContactWrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding-top: 3rem;
  padding-bottom: 5rem;
  
  &::before {
    content: '';
    display: block;
    height: 6px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryLight}
    );
    margin-bottom: 3rem;
  }
`;

const ContactSection = styled.section`
  ${props => props.theme.mixins.narrowContainer}
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const ServicePage = ({ title, description, image }) => {
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

export default ServicePage;

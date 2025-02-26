import React from 'react';
import styled from 'styled-components';

const DesignSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.background};

`;

const Container = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  width: 80%;
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: ${props => props.theme.radius.medium};
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const Content = styled.div`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.text};

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.1em;
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const SectionTitle = styled.h2`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  line-height: 1.2;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ColorBox = styled.div`
  background-color: ${props => props.color};
  padding: 1rem;
  border-radius: ${props => props.theme.radius.small};
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: ${props => props.theme.shadows.small};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DesignOptions = () => {
  const colors = [
    { name: 'Blue', hex: '#1E3F66', textColor: '#FFFFFF' },
    { name: 'Green', hex: '#2E7D32', textColor: '#FFFFFF' },
    { name: 'Brown', hex: '#5D4037', textColor: '#FFFFFF' },
    { name: 'Cream', hex: '#FFF8E1', textColor: '#000000' },
    { name: 'Grey', hex: '#455A64', textColor: '#FFFFFF' },
  ];

  return (
    <DesignSection aria-labelledby="design-options-title">
      <Container>
        <ImageWrapper>
          <img 
            src="/src/assets/Colourfence-1.jpg" 
            alt="BoreFence design options showing different color and style combinations"
            loading="lazy"
          />
        </ImageWrapper>
        <Content>
          <SectionTitle id="design-options-title">BoreFence Design Options</SectionTitle>
          <p>
            <strong>Customization Options</strong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            <strong>Premium Materials</strong>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ColorGrid role="list">
            {colors.map(color => (
              <ColorBox 
                key={color.name} 
                color={color.hex}
                style={{ color: color.textColor }}
                role="listitem"
                aria-label={`${color.name} color option`}
              >
                {color.name}
              </ColorBox>
            ))}
          </ColorGrid>
        </Content>
      </Container>
    </DesignSection>
  );
};

export default DesignOptions;

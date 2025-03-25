import React from 'react';
import styled from 'styled-components';
import { getImageUrl } from '../../utils/imageUtils';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const SectionHeading = styled.h3`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.h3};
  margin-top: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
`;

const ImageCard = styled.div`
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%; /* 4:3 aspect ratio */
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Caption = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: center;
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: ${props => props.theme.fonts.size.md};
`;

const RailingTops = () => {
  const railingTops = [
    // Top row
    { src: 'railings/tops/ball_top.jpg', name: 'Ball Top' },
    { src: 'railings/tops/bow_top.jpg', name: 'Bow Top' },
    { src: 'railings/tops/fleur_de_lys.jpg', name: 'Fleur de Lys' },
    // Bottom row
    { src: 'railings/tops/loop_and_fdl.jpg', name: 'Loop & Fleur de Lys' },
    { src: 'railings/tops/l_and_b.jpg', name: 'Loop & Ball' },
    { src: 'railings/tops/flat_top.jpg', name: 'Flat Top' }
  ];

  return (
    <Container>
      <SectionHeading>Available Railing Top Styles</SectionHeading>
      <GridContainer aria-label="Railing top style options" role="region">
        {railingTops.map((top, index) => (
          <ImageCard key={index}>
            <ImageContainer>
              <Image 
                src={getImageUrl(top.src)} 
                alt={`${top.name} railing top style`} 
                loading="lazy"
              />
            </ImageContainer>
            <Caption>{top.name}</Caption>
          </ImageCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default RailingTops;

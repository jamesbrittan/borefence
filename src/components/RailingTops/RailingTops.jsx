import styled from 'styled-components';
import { Img } from '../../images';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

// Same style and spacing as the colour palette heading above it
const SectionHeading = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.sectionTitle};
  margin-top: ${props => props.theme.spacing.section};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  
  /* Two per row on tablets and phones, rather than one long column */
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
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

const Image = styled(Img)`
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
                path={top.src}
                widths={[400, 600, 800]}
                height={300}
                fit="cover"
                sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 340px"
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

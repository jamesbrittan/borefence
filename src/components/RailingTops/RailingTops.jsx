import styled from 'styled-components';
import { Img } from '../../images';

// Names as in CONTEXT.md ("Railing top")
const RAILING_TOPS = [
  { src: 'railings/tops/ball_top.jpg', name: 'Ball Top' },
  { src: 'railings/tops/bow_top.jpg', name: 'Bow Top' },
  { src: 'railings/tops/fleur_de_lys.jpg', name: 'Fleur de Lys' },
  { src: 'railings/tops/loop_and_fdl.jpg', name: 'Loop & Fleur de Lys' },
  { src: 'railings/tops/l_and_b.jpg', name: 'Loop & Ball' },
  { src: 'railings/tops/flat_top.jpg', name: 'Flat Top' },
];

const Section = styled.section`
  margin-top: ${props => props.theme.spacing.section};
`;

// Same style and spacing as the colour palette heading above it
const Heading = styled.h2`
  ${props => props.theme.typography.h2}
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

// 3 per row on desktop, 2 on tablets and phones
const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.figure`
  margin: 0;
  height: 100%;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  background-color: ${props => props.theme.colors.white};
`;

// The supplied photos have each style's name printed on a tag in their
// lower third. Showing only the top of each photo (where the finials are)
// keeps the caption as the one, consistently spelled, name. The 4% offset
// also trims a stray line along the top edge of the Flat Top photo.
const Photo = styled(Img)`
  display: block;
  width: 100%;
  aspect-ratio: 2.2 / 1;
  object-fit: cover;
  object-position: 50% 4%;
`;

const Caption = styled.figcaption`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: center;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
`;

const RailingTops = () => (
  <Section aria-labelledby="railing-tops">
    <Heading id="railing-tops">Available Railing Top Styles</Heading>
    <Grid>
      {RAILING_TOPS.map((top) => (
        <li key={top.src}>
          <Card>
            <Photo
              path={top.src}
              widths={[320, 490]}
              sizes="(max-width: 768px) 45vw, 340px"
              alt=""
              loading="lazy"
            />
            <Caption>{top.name}</Caption>
          </Card>
        </li>
      ))}
    </Grid>
  </Section>
);

export default RailingTops;

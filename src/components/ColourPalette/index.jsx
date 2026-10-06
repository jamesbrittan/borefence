import styled from 'styled-components';

// Standard finishes; names as in CONTEXT.md ("Colour palette")
const COLOURS = [
  { name: 'Cream', key: 'cream' },
  { name: 'Green', key: 'green' },
  { name: 'Blue', key: 'blue' },
  { name: 'Brown', key: 'brown' },
  { name: 'Anthracite Grey', key: 'anthraciteGrey' },
  { name: 'Matt or Gloss Black', key: 'mattBlack' },
];

const Section = styled.section`
  margin-top: ${props => props.theme.spacing.section};
`;

const Heading = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.sectionTitle};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

// One evenly wrapping grid: 3 per row on desktop, 2 on tablets and phones
const Swatches = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Swatch = styled.li`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

// The colour itself; the name sits below it on white, so it's always readable
const Chip = styled.div`
  aspect-ratio: 16 / 9;
  background-color: ${props => props.theme.colors.fence[props.$colourKey]};
  /* A hairline keeps the light Cream chip distinct from the white card */
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.08);
`;

const Name = styled.p`
  margin: 0;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: center;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
`;

const Note = styled.p`
  margin: ${props => props.theme.spacing.md} 0 0;
  text-align: center;
  font-size: ${props => props.theme.fonts.size.sm};
  color: ${props => props.theme.colors.textLight};
`;

const ColourPalette = () => (
  <Section aria-labelledby="railing-colours">
    <Heading id="railing-colours">Available Railing Colours</Heading>
    <Swatches>
      {COLOURS.map(({ name, key }) => (
        <Swatch key={key}>
          <Chip $colourKey={key} aria-hidden="true" />
          <Name>{name}</Name>
        </Swatch>
      ))}
    </Swatches>
  </Section>
);

export default ColourPalette;

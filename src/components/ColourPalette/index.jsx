import styled from 'styled-components';

const PaletteHeading = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.h2};
  margin-top: ${props => props.theme.spacing.xxxl}; /* Increased top margin */
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    height: auto;
  }
`;

const BottomRow = styled.div`
  display: flex;
  width: 100%;
  height: 280px;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    height: auto;
  }
`;

const ColorBlock = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: ${props => props.theme.fonts.size.lg};
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 150px;
    font-size: ${props => props.theme.fonts.size.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 100px;
  }
`;

const LargeColorBlock = styled(ColorBlock)`
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: 1 1 45%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex: 1 1 100%;
  }
`;

const CreamBlock = styled(LargeColorBlock)`
  background-color: ${props => props.theme.colors.fence.cream};
  color: #333333; /* Dark text for better contrast on light background */
`;

const GreenBlock = styled(LargeColorBlock)`
  background-color: ${props => props.theme.colors.fence.green};
  color: ${props => props.theme.colors.white};
`;

const BlueBlock = styled(LargeColorBlock)`
  background-color: ${props => props.theme.colors.fence.blue};
  color: ${props => props.theme.colors.white};
`;

const BrownBlock = styled(LargeColorBlock)`
  background-color: ${props => props.theme.colors.fence.brown};
  color: ${props => props.theme.colors.white};
`;

const AnthraciteGreyBlock = styled(ColorBlock)`
  background-color: ${props => props.theme.colors.fence.anthraciteGrey};
  color: ${props => props.theme.colors.white};
`;

const BlackBlock = styled(ColorBlock)`
  background-color: ${props => props.theme.colors.fence.mattBlack};
  color: ${props => props.theme.colors.white};
`;

const ColourPalette = () => {
  return (
    <div>
      <PaletteHeading>Available Railing Colours</PaletteHeading>
      <Container aria-label="Available fence colour options" role="region">
        <TopRow>
          <CreamBlock aria-label="Cream coloured finish">Cream</CreamBlock>
          <GreenBlock aria-label="Green coloured finish">Green</GreenBlock>
          <BlueBlock aria-label="Blue coloured finish">Blue</BlueBlock>
          <BrownBlock aria-label="Brown coloured finish">Brown</BrownBlock>
        </TopRow>
        <BottomRow>
          <AnthraciteGreyBlock aria-label="Anthracite Grey coloured finish">Anthracite Grey</AnthraciteGreyBlock>
          <BlackBlock aria-label="Matt or Gloss Black coloured finish">Matt or Gloss Black</BlackBlock>
        </BottomRow>
      </Container>
    </div>
  );
};

export default ColourPalette;
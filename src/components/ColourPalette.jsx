import styled from 'styled-components';

const colors = [
  { name: 'Cream', hex: '#E9D9B2' },
  { name: 'Green', hex: '#00513F' },
  { name: 'Blue', hex: '#2D4057' },
  { name: 'Brown', hex: '#5F3C39' },
  { name: 'Anthracite Grey', hex: '#3A3E3D' },
  { name: 'Matt or Gloss Black', hex: '#121212' },
];

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${props => props.theme.spacing.xl} auto;
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
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  font-size: ${props => props.theme.spacing.lg};
  text-transform: uppercase;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 150px;
    font-size: ${props => props.theme.spacing.md};
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

const ColorPalette = () => {
  return (
    <Container>
      <TopRow>
        {colors.slice(0, 4).map((color) => (
          <LargeColorBlock key={color.name} color={color.hex}>
            {color.name}
          </LargeColorBlock>
        ))}
      </TopRow>
      <BottomRow>
        <ColorBlock color={colors[4].hex}>
          {colors[4].name}
        </ColorBlock>
        <ColorBlock color={colors[5].hex}>
          {colors[5].name}
        </ColorBlock>
      </BottomRow>
    </Container>
  );
};

export default ColorPalette;

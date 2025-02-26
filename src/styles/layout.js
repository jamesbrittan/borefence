import styled, { css } from 'styled-components';

// Container variants
const variants = {
  default: css`
    max-width: 1200px;
    padding: 0 2rem;
  `,
  narrow: css`
    max-width: 800px;
    padding: 0 1.5rem;
  `,
  wide: css`
    max-width: 1400px;
    padding: 0 2rem;
  `,
  fluid: css`
    max-width: none;
    padding: 0 2rem;
  `,
};

// Vertical spacing variants
const spacing = {
  none: css`
    margin: 0 auto;
  `,
  small: css`
    margin: 2rem auto;
  `,
  medium: css`
    margin: 4rem auto;
  `,
  large: css`
    margin: 6rem auto;
  `,
};

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  
  // Apply variant styles
  ${props => variants[props.variant || 'default']}
  
  // Apply spacing
  ${props => spacing[props.spacing || 'none']}
  
  // Apply background if provided
  ${props => props.background && css`
    background: ${props.background};
    border-radius: ${props => props.theme.radius.medium};
    padding: ${props => props.padding || '2rem'};
  `}
  
  // Apply semi-transparent style if specified
  ${props => props.transparent && css`
    background: ${props => `${props.theme.colors.background}CC`};
    backdrop-filter: blur(8px);
    border: 1px solid ${props => `${props.theme.colors.gray}80`};
  `}
  
  // Center content if specified
  ${props => props.center && css`
    text-align: center;
  `}
  
  // Full height if specified
  ${props => props.fullHeight && css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `}
`;

// Section component for consistent vertical spacing
export const Section = styled.section`
  padding: ${props => props.padding || '4rem 0'};
  background: ${props => props.background || 'transparent'};
  
  ${props => props.dark && css`
    background: ${props.theme.colors.darkGray};
    color: ${props.theme.colors.white};
  `}
`;

// Grid system
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 12}, 1fr);
  gap: ${props => props.gap || '2rem'};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.mobileCols || 1}, 1fr);
    gap: ${props => props.mobileGap || '1.5rem'};
  }
`;

// Column component
export const Column = styled.div`
  grid-column: span ${props => props.span || 12};
  
  @media (max-width: 768px) {
    grid-column: span ${props => props.mobileSpan || 12};
  }
`;

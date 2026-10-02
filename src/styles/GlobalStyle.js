import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    ${props => props.theme.typography.body}
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    min-width: 320px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Header, page and footer stack vertically; the page grows so the footer
     sits at the bottom of the window on short pages. */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #root > main {
    flex: 1 0 auto;
  }

  /* Form controls don't inherit the page font by default */
  button,
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    ${props => props.theme.typography.heading}
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fonts.weights.medium};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

export default GlobalStyle;

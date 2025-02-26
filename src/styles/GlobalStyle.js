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
  }

  h1, h2, h3, h4, h5, h6 {
    ${props => props.theme.typography.heading}
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

export default GlobalStyle;

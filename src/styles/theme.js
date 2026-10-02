import { css } from 'styled-components';

const theme = {
  fonts: {
    body: "'Barlow', sans-serif",
    heading: "'Montserrat', sans-serif",
    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    size: {
      // Heading sizes
      HeroTitle: 'clamp(2.5rem, 5vw, 3.5rem)',
      h1: 'clamp(2.2rem, 4vw, 3rem)',
      h2: 'clamp(1.8rem, 3vw, 2.5rem)',
      h3: 'clamp(1.5rem, 2.5vw, 2rem)',
      h4: 'clamp(1.3rem, 2vw, 1.75rem)',
      h5: 'clamp(1.1rem, 1.5vw, 1.5rem)',
      h6: '1.25rem',
      
      // Body text sizes
      xl: '1.25rem',
      lg: '1.125rem',
      md: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
      
      // Special cases
      subtitle: 'clamp(1.1rem, 2vw, 1.3rem)',
      sectionTitle: 'clamp(1.8rem, 3vw, 2.2rem)',
      buttonText: '1rem',
      small: '0.8rem',
    },
  },
  colors: {
    primary: '#1B3B5F',    // Deep Navy Blue (10.5:1)
    primaryLight: 'rgba(27, 59, 95, 0.2)',
    primaryDark: '#1d4ed8',
    secondary: '#2D5F8A',  // Medium Blue (7.2:1)
    accent: '#4A90E2',     // Ocean Blue (4.5:1)
    text: '#1A1A1A',
    textLight: '#4D4D4D',
    background: '#F8FBFF',
    border: '#e5e7eb',
    error: '#B54141',
    success: '#2D694B',
    white: '#FFFFFF',
    gray: '#F5F5F5',
    darkGray: '#2C2C2C',
    overlay: 'rgba(27, 59, 95, 0.9)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    fence: {
      cream: '#E9D9B2',
      green: '#00513F',
      blue: '#2D4057',
      brown: '#5F3C39',
      anthraciteGrey: '#3A3E3D',
      mattBlack: '#121212'
    }
  },
  spacing: {
    xxs: '0.25rem',  // 4px
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
    xxxl: '4rem',    // 64px
    huge: '6rem',    // 96px
    giant: '8rem',   // 128px
    section: {
      padding: {
        default: '4rem 0',
        large: '6rem 0',
        hero: '6rem 0 12rem'
      },
      gap: {
        default: '4rem',
        small: '2rem'
      }
    },
    component: {
      padding: {
        default: '2rem',
        small: '1rem',
        large: '3rem'
      },
      gap: {
        default: '1.5rem',
        small: '0.5rem',
        large: '2rem'
      }
    }
  },
  typography: {
    body: css`
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      line-height: 1.6;
    `,
    heading: css`
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      line-height: 1.2;
    `,
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  radius: {
    small: '4px',
    medium: '6px',
    large: '8px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  layout: {
    sectionPadding: '4rem 0',
    contentWidth: '80%',
    maxWidth: '1080px',
    mobileContentWidth: '90%',
  },
  mixins: {
    fullWidth: css`
      width: 100%;
    `,
    narrowContainer: css`
      width: 80%;
      max-width: 1080px;
      margin: 0 auto;

      @media (max-width: ${props => props.theme.breakpoints.tablet}) {
        width: 90%;
      }
    `,
    section: css`
      width: 100%;
      padding: 4rem 0;
    `,
  },
};

export default theme;

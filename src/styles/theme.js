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
    // Type scale (#35 / docs/adr/0003-type-scale.md). Each step scales
    // smoothly with the screen: about 1.25x between steps on phones, about
    // 1.33x on desktop. Use these through theme.typography, not directly.
    size: {
      display: 'clamp(2.5rem, 2rem + 2.5vw, 3.5rem)',      // 40 -> 56px  home hero
      h1: 'clamp(2rem, 1.6rem + 2vw, 2.75rem)',            // 32 -> 44px  page titles
      h2: 'clamp(1.625rem, 1.4rem + 1.1vw, 2.125rem)',     // 26 -> 34px  section headings
      h3: 'clamp(1.3rem, 1.2rem + 0.5vw, 1.5rem)',         // 21 -> 24px  card / component headings
      lead: 'clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)',   // 18 -> 20px  intro paragraphs
      body: '1.0625rem',                                    // 17px        running text
      nav: '1rem',                                          // 16px        navigation, buttons
      small: '0.875rem',                                    // 14px        labels, captions, notes
    },
  },
  colors: {
    primary: '#1B3B5F',    // Deep Navy Blue (10.5:1)
    primaryLight: 'rgba(27, 59, 95, 0.2)',
    primaryDark: '#132B45',
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
    // Spacing system: values that scale smoothly with the screen width, so
    // spacing tightens on phones without jumping at breakpoints.
    gutter: 'clamp(1.25rem, 5vw, 2.5rem)',   // page side margin: 20px -> 40px
    section: 'clamp(2.5rem, 6vw, 4rem)',     // between page sections: 40px -> 64px
    card: 'clamp(1.25rem, 4vw, 2rem)',       // inside cards: 20px -> 32px
    cardLarge: 'clamp(1.5rem, 5vw, 3rem)',   // inside large cards: 24px -> 48px
    component: {
      gap: {
        default: '1.5rem',
        small: '0.5rem',
        large: '2rem'
      }
    }
  },
  // Text styles: font, size, weight, line height and spacing together.
  // Style by role, not by tag: e.g. a form heading can be an <h2> for
  // structure and still use the h3 style.
  typography: {
    headingFont: css`
      font-family: ${props => props.theme.fonts.heading};
      font-weight: ${props => props.theme.fonts.weights.semiBold};
      line-height: 1.2;
    `,
    display: css`
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fonts.size.display};
      font-weight: ${props => props.theme.fonts.weights.bold};
      line-height: 1.1;
      letter-spacing: -0.01em;
    `,
    h1: css`
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fonts.size.h1};
      font-weight: ${props => props.theme.fonts.weights.bold};
      line-height: 1.15;
      letter-spacing: -0.01em;
    `,
    h2: css`
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fonts.size.h2};
      font-weight: ${props => props.theme.fonts.weights.semiBold};
      line-height: 1.2;
    `,
    h3: css`
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fonts.size.h3};
      font-weight: ${props => props.theme.fonts.weights.semiBold};
      line-height: 1.25;
    `,
    lead: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.lead};
      font-weight: ${props => props.theme.fonts.weights.regular};
      line-height: 1.5;
    `,
    body: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.body};
      font-weight: ${props => props.theme.fonts.weights.regular};
      line-height: 1.6;
    `,
    small: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.small};
      font-weight: ${props => props.theme.fonts.weights.regular};
      line-height: 1.5;
    `,
    // Form labels and small headings over lists
    label: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.small};
      font-weight: ${props => props.theme.fonts.weights.semiBold};
      line-height: 1.4;
    `,
    // Header and footer navigation links
    nav: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.nav};
      font-weight: ${props => props.theme.fonts.weights.medium};
      line-height: 1.5;
    `,
    button: css`
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fonts.size.nav};
      font-weight: ${props => props.theme.fonts.weights.semiBold};
      line-height: 1.25;
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
    maxWidth: '1080px', // widest the page content gets
  },
  mixins: {
    fullWidth: css`
      width: 100%;
    `,
    // The page container: content up to layout.maxWidth wide, centred, with
    // the gutter on each side. Everything that lines up with the page edge
    // uses this, so all sections share one left edge at every width.
    container: css`
      width: 100%;
      max-width: calc(${props => props.theme.layout.maxWidth} + 2 * ${props => props.theme.spacing.gutter});
      margin-inline: auto;
      padding-inline: ${props => props.theme.spacing.gutter};
    `,
  },
};

export default theme;

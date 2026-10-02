import { useState } from 'react';
import { css } from 'styled-components';

// Review-only: candidate styles for the hero quote form panel (issue #12).
// Each variant except "current" meets WCAG 2.2 AA contrast whatever part of
// the hero photo sits behind the panel (worst case: pure white for the dark
// panels, pure black for the light one). Once one is chosen, keep its styles
// in FormColumn and delete this file and FormVariantPicker.

// Nested selectors include the element (e.g. `input:hover`) so they win over
// ContactForm's own single-class styles.
const darkFields = css`
  label {
    color: #FFFFFF;
    text-shadow: none;
  }

  input,
  input:hover,
  input:focus,
  textarea,
  textarea:hover,
  textarea:focus {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    color: #FFFFFF;
  }

  input:focus,
  textarea:focus {
    border-color: #FFFFFF;
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const FORM_VARIANTS = {
  current: {
    label: 'Current',
    description: 'Today\'s translucent glass. Fails contrast over the sky (as low as 1.2:1).',
    dark: true,
    styles: css``,
  },
  smoked: {
    label: 'A · Smoked glass',
    description: 'Closest to today: still see-through and blurred, tinted dark slate.',
    dark: true,
    styles: css`
      background: rgba(15, 23, 42, 0.65);
      border-color: rgba(255, 255, 255, 0.25);
      ${darkFields}
    `,
  },
  navyGlass: {
    label: 'B · Navy glass',
    description: 'Brand navy tint, slightly see-through, ties in with the footer.',
    dark: true,
    styles: css`
      background: rgba(27, 59, 95, 0.85);
      border-color: rgba(255, 255, 255, 0.25);
      ${darkFields}
    `,
  },
  frosted: {
    label: 'C · Frosted white',
    description: 'Light frosted glass with dark text and a navy button.',
    dark: false,
    styles: css`
      background: rgba(255, 255, 255, 0.88);
      border-color: rgba(255, 255, 255, 0.6);

      h3 {
        color: ${props => props.theme.colors.primary};
      }

      label {
        color: ${props => props.theme.colors.text};
      }

      input,
      input:hover,
      textarea,
      textarea:hover {
        background: rgba(255, 255, 255, 0.7);
        border-color: #6B7280;
      }

      input::placeholder,
      textarea::placeholder {
        color: #595959;
      }
    `,
  },
  solid: {
    label: 'D · Solid navy',
    description: 'Solid brand navy card, no transparency. Most robust.',
    dark: true,
    styles: css`
      background: ${props => props.theme.colors.primary};
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      border-color: transparent;
      ${darkFields}
    `,
  },
};

export const DEFAULT_FORM_VARIANT = 'current';

const readVariant = () => {
  const key = new URLSearchParams(window.location.search).get('form');
  return FORM_VARIANTS[key] ? key : DEFAULT_FORM_VARIANT;
};

export const useFormVariant = () => {
  const [variant, setVariant] = useState(readVariant);

  const selectVariant = (key) => {
    const url = new URL(window.location.href);
    url.searchParams.set('form', key);
    window.history.replaceState(null, '', url);
    setVariant(key);
  };

  return [variant, selectVariant];
};

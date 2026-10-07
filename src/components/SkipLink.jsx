import styled from 'styled-components';

// Every page's <main> carries this id (with tabIndex -1 so it can take focus)
export const MAIN_CONTENT_ID = 'main-content';

// First focusable element on every page: lets keyboard users jump past the
// header. Hidden until it receives focus.
const Link = styled.a`
  position: absolute;
  top: ${props => props.theme.spacing.xs};
  left: ${props => props.theme.spacing.xs};
  z-index: 1100; /* above the sticky header */
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  ${props => props.theme.typography.button}
  transform: translateY(-200%);

  &:focus {
    transform: none;
    color: ${props => props.theme.colors.white};
    outline: 3px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }
`;

const SkipLink = () => <Link href={`#${MAIN_CONTENT_ID}`}>Skip to main content</Link>;

export default SkipLink;

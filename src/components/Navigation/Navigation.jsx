import { useState, useRef, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { imageSrc } from '../../images';
import { services, servicePath } from '../../catalogue/services';

// Twice the largest display width (202px) for high-density screens.
const logoPath = imageSrc('logo.png', { width: 404 });

const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  min-height: 80px;
  padding: 0 ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.white};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 64px;
    padding: 0 clamp(0.75rem, 4vw, 1rem);
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

// The logo is ~5:1, so on phones it shrinks with the viewport to leave room
// for the links (202px wide at full size, ~122px at 320px).
const LogoImage = styled.img`
  display: block;
  width: clamp(112px, 38vw, 202px);
  height: auto;
`;

const NavLinks = styled.div`
  display: flex;
  align-self: stretch;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: clamp(0.75rem, 4vw, 1rem);
  }
`;

// Marks the link (or "Services" button) for the page you're on.
const currentPageStyle = props => `
  color: ${props.theme.colors.primary};
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.3em;
`;

const NavLink = styled(RouterNavLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: ${props => props.theme.fonts.size.md};
  transition: color 0.2s;

  &:hover, &:focus {
    color: ${props => props.theme.colors.primary};
  }

  &[aria-current='page'] {
    ${currentPageStyle}
  }
`;

// Fills the header's height so the menu (top: 100%) opens at the header's
// bottom edge and the pointer can reach it without leaving the container.
const DropdownContainer = styled.div`
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;

  /* On phones the menu spans the header (positioned against Nav instead),
     so it can't run off the left edge of narrow screens. */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: static;
  }
`;

const ServicesButton = styled.button`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: ${props => props.theme.fonts.size.md};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;

  &:hover, &:focus {
    color: ${props => props.theme.colors.primary};
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 4px;
    border-radius: 2px;
  }

  ${props => props.$isCurrentSection && currentPageStyle(props)}
`;

// An SVG rather than a text glyph: its box is exactly the arrow, so it turns
// in place, and currentColor keeps it the same colour as the button text.
const CaretIcon = styled.svg`
  display: block;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  transform-origin: 50% 50%;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'none'};
  transition: transform 150ms ease-out;
`;

const Caret = ({ isOpen }) => (
  <CaretIcon
    $isOpen={isOpen}
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M2.5 4.25 6 7.75l3.5-3.5" />
  </CaretIcon>
);

const DropdownMenu = styled.ul`
  list-style: none;
  position: absolute;
  top: 100%;
  right: 0;
  margin: 0;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 0.5rem 0;
  min-width: 250px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transform: ${props => props.$isOpen ? 'none' : 'translateY(-4px)'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  /* Slides down into place, flush with the header's bottom edge. On close,
     visibility flips only once the fade has finished. */
  transition:
    opacity 150ms ease-out,
    transform 150ms ease-out,
    visibility 0s linear ${props => props.$isOpen ? '0s' : '150ms'};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: clamp(0.75rem, 4vw, 1rem);
    right: clamp(0.75rem, 4vw, 1rem);
    min-width: 0;
  }
`;

const DropdownLink = styled(RouterNavLink)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover, &:focus {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: -2px;
  }

  &[aria-current='page'] {
    ${currentPageStyle}
  }
`;

const Navigation = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const isOnServicePage = services.some((service) => servicePath(service) === pathname);

  const closeServices = () => setIsServicesOpen(false);

  // Opens on click or tap only, like the W3C disclosure navigation example.
  // While open, Escape (from anywhere, so it works whatever opened the menu)
  // and a click outside close it.
  useEffect(() => {
    if (!isServicesOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      const focusWasInside = dropdownRef.current?.contains(document.activeElement);
      setIsServicesOpen(false);
      if (focusWasInside) buttonRef.current?.focus();
    };

    const handlePointerDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsServicesOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isServicesOpen]);

  // Close once focus moves outside the button and its links.
  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      closeServices();
    }
  };

  return (
    <Nav>
      <NavContent>
        <LogoLink to="/">
          <LogoImage src={logoPath} alt="BoreFence home" />
        </LogoLink>
        <NavLinks>
          <DropdownContainer ref={dropdownRef} onBlur={handleBlur}>
            <ServicesButton
              ref={buttonRef}
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              aria-expanded={isServicesOpen}
              aria-controls="services-menu"
              $isCurrentSection={isOnServicePage}
            >
              Services
              <Caret isOpen={isServicesOpen} />
            </ServicesButton>
            <DropdownMenu id="services-menu" $isOpen={isServicesOpen}>
              {services.map((service) => (
                <li key={service.slug}>
                  <DropdownLink to={servicePath(service)} onClick={closeServices}>
                    {service.name}
                  </DropdownLink>
                </li>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navigation;

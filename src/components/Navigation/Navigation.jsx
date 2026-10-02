import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.fonts.weights.medium};
  font-size: ${props => props.theme.fonts.size.md};
  transition: color 0.2s;

  &:hover, &:focus {
    color: ${props => props.theme.colors.primary};
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
`;

const Caret = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;

  &::after {
    content: '▾';
    display: block;
    font-size: 1.2em;
    line-height: 0.5;
  }
`;

const DropdownMenu = styled.ul`
  list-style: none;
  position: absolute;
  top: 100%;
  right: 0;
  transform: translateY(-10px);
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 0.5rem 0;
  min-width: 250px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s;
  margin-top: 0.25rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: clamp(0.75rem, 4vw, 1rem);
    right: clamp(0.75rem, 4vw, 1rem);
    min-width: 0;
  }
`;

const DropdownLink = styled(Link)`
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
`;

const Navigation = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const buttonRef = useRef(null);

  // True while the menu is open only because a mouse is hovering over it,
  // so a click on "Services" keeps it open instead of toggling it shut.
  const openedByHover = useRef(false);

  const closeServices = () => {
    openedByHover.current = false;
    setIsServicesOpen(false);
  };

  const handlePointerEnter = (e) => {
    if (e.pointerType === 'mouse' && !isServicesOpen) {
      openedByHover.current = true;
      setIsServicesOpen(true);
    }
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType === 'mouse') {
      closeServices();
    }
  };

  const handleButtonClick = () => {
    if (openedByHover.current) {
      openedByHover.current = false;
      return;
    }
    setIsServicesOpen(!isServicesOpen);
  };

  // Disclosure pattern: Escape closes and returns focus to the button.
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isServicesOpen) {
      closeServices();
      buttonRef.current?.focus();
    }
  };

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
          <LogoImage src={logoPath} alt="Bore Fence Ltd" />
        </LogoLink>
        <NavLinks>
          <DropdownContainer
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          >
            <ServicesButton
              ref={buttonRef}
              type="button"
              onClick={handleButtonClick}
              aria-expanded={isServicesOpen}
              aria-controls="services-menu"
            >
              Services
              <Caret $isOpen={isServicesOpen} aria-hidden="true" />
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

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getImageUrl } from '../../utils/imageUtils';

const logoPath = getImageUrl('logo.png');

const Nav = styled.nav`
  ${props => props.theme.mixins.container}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem ${props => props.theme.spacing.lg};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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

const DropdownContainer = styled.div`
  position: relative;
  padding: 1rem 0;
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

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

const DropdownMenu = styled.div`
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

const Navigation = ( ) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const services = [
    { name: 'Fencing', path: '/services/fencing' },
    { name: 'Railings', path: '/services/railings' },
    { name: 'Gates', path: '/services/gates' },
    { name: 'Sheds', path: '/services/sheds' },
    // { name: 'Tree Felling', path: '/services/tree-felling' },
    // { name: 'Reviews', path: '/services/reviews' }
  ];

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        setIsServicesOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        if (!isServicesOpen) {
          setIsServicesOpen(true);
          e.preventDefault();
          // Focus first menu item
          setTimeout(() => {
            dropdownRef.current?.querySelector('a')?.focus();
          }, 100);
        }
        break;
      default:
        break;
    }
  };

  const handleButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsServicesOpen(!isServicesOpen);
    }
  };

  const handleMouseEnter = () => {
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    setIsServicesOpen(false);
  };

  return (
    <Nav>
      <NavContent>
        <LogoLink to="/">
          <LogoImage src={logoPath} alt="Bore Fence Ltd" />
        </LogoLink>
        <NavLinks>
          <DropdownContainer 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
          >
            <ServicesButton
              ref={buttonRef}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onKeyDown={handleButtonKeyDown}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              aria-label={`Services menu, press Enter to ${isServicesOpen ? 'close' : 'open'} dropdown`}
            >
              Services
              <Caret $isOpen={isServicesOpen} aria-hidden="true" />
              <span className="sr-only">, press Enter to {isServicesOpen ? 'close' : 'open'} dropdown</span>
            </ServicesButton>
            <DropdownMenu 
              ref={dropdownRef}
              $isOpen={isServicesOpen}
              role="menu"
              aria-label="Services menu"
            >
              {services.map((service) => (
                <DropdownLink 
                  key={service.path}
                  to={service.path}
                  role="menuitem"
                  onClick={() => setIsServicesOpen(false)}
                  tabIndex={isServicesOpen ? 0 : -1}
                >
                  {service.name}
                </DropdownLink>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          <NavLink to="/contact">Contact</NavLink>
          {/* <NavLink to="/reviews">Reviews</NavLink> */}
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navigation;

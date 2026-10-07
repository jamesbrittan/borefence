import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { imageSrc } from '../../images';
import { services, servicePath } from '../../catalogue/services';
import { business, telHref } from '../../business/details';

const HERO_IMAGE = 'fence_brown_h.jpg';

// Dark tinted glass shared by the quote form and the service links. Opaque
// enough that white text keeps 4.5:1 contrast even over pure white sky
// (ADR-0001).
const smokedGlass = css`
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(15px) saturate(160%);
  -webkit-backdrop-filter: blur(15px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

// A scrim darkest behind the text: left-to-right on desktop, where the text
// sits on the left; top-to-bottom on tablets and phones, where it sits on top.
const SCRIM_SIDE = 'linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.58) 45%, rgba(15, 23, 42, 0.2) 100%)';
const SCRIM_TOP = 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.55) 45%, rgba(15, 23, 42, 0.3) 100%)';

const StyledHeroSection = styled.section`
  position: relative;
  width: 100%;
  /* Height follows the content, with a sensible minimum */
  min-height: clamp(560px, 70vh, 720px);
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.white};
  overflow: hidden;
  z-index: 2; /* the "Our product" card overlaps the hero's bottom edge */

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('${props => props.$backgroundImage || imageSrc(HERO_IMAGE, { width: 1920 })}');
    background-size: cover;
    background-position: center 60%;
    z-index: 1;

    /* Smaller hero downloads on smaller screens */
    @media (max-width: ${props => props.theme.breakpoints.desktop}) {
      background-image: url('${props => props.$backgroundImage || imageSrc(HERO_IMAGE, { width: 1280 })}');
    }

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      background-image: url('${props => props.$backgroundImage || imageSrc(HERO_IMAGE, { width: 800 })}');
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${SCRIM_SIDE};
    z-index: 2;

    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      background: ${SCRIM_TOP};
    }
  }
`;

// Text about 7/12, form about 5/12, vertically centred against each other
const HeroContent = styled.div`
  ${props => props.theme.mixins.container}
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: center;
  gap: ${props => props.theme.spacing.section};
  /* Extra bottom space for the "Our product" card, which overlaps the hero by
     2rem. Kept tight so the hero fits above the fold on 1280x800 screens. */
  padding-block: ${props => props.theme.spacing.xxl} calc(${props => props.theme.spacing.xxl} + 2rem);

  /* Equal columns on small desktops so the form's fields stay wide enough */
  @media (max-width: ${props => props.theme.breakpoints.wide}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const HeroText = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
`;

// The hero's one accent: a short underline under the headline, fading to
// transparent in its own colour
const HeroTitle = styled.h1`
  ${props => props.theme.typography.display}
  max-width: 18ch;
  text-wrap: balance;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: ${props => props.theme.spacing.lg};

  &::after {
    content: '';
    display: block;
    width: 72px;
    height: 3px;
    margin-top: ${props => props.theme.spacing.md};
    border-radius: 2px;
    background: linear-gradient(to right, ${props => props.theme.colors.accent}, rgb(74 144 226 / 0));
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-inline: auto;

    &::after {
      margin-inline: auto;
      background: linear-gradient(to right, rgb(74 144 226 / 0), ${props => props.theme.colors.accent}, rgb(74 144 226 / 0));
    }
  }
`;

const HeroSubtitle = styled.p`
  ${props => props.theme.typography.lead}
  font-weight: ${props => props.theme.fonts.weights.medium};
  max-width: 45ch;
  text-wrap: balance;
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-inline: auto;
  }
`;

const HeroDescription = styled.p`
  ${props => props.theme.typography.body}
  max-width: 55ch;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ServicesLabel = styled.p`
  ${props => props.theme.typography.label}
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

// Each Service as its own pill: sized to its text, wrapping naturally
const ServiceList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const ServiceLink = styled(Link)`
  ${props => props.theme.typography.label}
  ${smokedGlass}
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.md};
  border-radius: 999px;
  color: ${props => props.theme.colors.white};
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.white};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const Call = styled.p`
  ${props => props.theme.typography.body}
  margin: ${props => props.theme.spacing.md} 0 0;

  a {
    color: ${props => props.theme.colors.white};
    font-weight: ${props => props.theme.fonts.weights.semiBold};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  a:focus-visible {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 2px;
  }
`;

const FormColumn = styled.div`
  ${smokedGlass}
  width: 100%;
  padding: ${props => props.theme.spacing.card};
  border-radius: ${props => props.theme.radius.large};
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-self: center;
    max-width: 500px;
  }
`;

const HeroSection = ({
  title,
  subtitle,
  description,
  backgroundImage,
  rightColumnContent,
  showServiceLinks = false,
  showPhone = false,
}) => {
  const phone = business.phones[0];
  return (
    <StyledHeroSection $backgroundImage={backgroundImage}>
      <HeroContent>
        <HeroText>
          <HeroTitle>{title}</HeroTitle>
          {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
          {description && <HeroDescription>{description}</HeroDescription>}

          {showServiceLinks && (
            <nav aria-labelledby="hero-services">
              <ServicesLabel id="hero-services">Our services</ServicesLabel>
              <ServiceList>
                {services.map((service) => (
                  <li key={service.slug}>
                    <ServiceLink to={servicePath(service)}>{service.name}</ServiceLink>
                  </li>
                ))}
              </ServiceList>
            </nav>
          )}

          {showPhone && (
            <Call>
              Prefer to talk? Call <a href={telHref(phone)}>{phone.display}</a>
            </Call>
          )}
        </HeroText>
        {rightColumnContent && <FormColumn>{rightColumnContent}</FormColumn>}
      </HeroContent>
    </StyledHeroSection>
  );
};

export default HeroSection;

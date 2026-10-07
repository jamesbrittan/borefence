import styled, { css } from 'styled-components';
import { MAIN_CONTENT_ID } from '../components/SkipLink';
import { QuoteRequestSection } from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import Gallery from '../components/Gallery';
import { Link } from 'react-router-dom';
import { galleryImages, services, servicePath } from '../catalogue/services';
import { business, telHref } from '../business/details';

const QUOTE_ID = 'quote';

const ServiceContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
`;

const FullWidthSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
`;

const HeaderSection = styled.section`
  ${props => props.theme.mixins.container}
  padding-top: ${props => props.theme.spacing.section};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${props => props.theme.spacing.xl};
  width: 100%;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  padding: ${props => props.theme.spacing.card};
  box-shadow: ${props => props.theme.shadows.medium};
  flex-direction: row-reverse;
  
  /* Stack text above the gallery on tablets and phones (left-aligned throughout) */
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const GalleryWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: visible;
  border-radius: ${props => props.theme.radius.medium};
`;

const TitleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h1`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.primary};
  /* 4.2rem on wide screens, scaling down so long words fit on phones */
  font-size: clamp(2.25rem, 10vw, 4.2rem);
  overflow-wrap: break-word;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  position: relative;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${props => props.theme.spacing.xs};
    left: 0;
    width: 140px;
    height: 3px;
    background: linear-gradient(
      to left,
      ${props => props.theme.colors.primaryLight},
      ${props => props.theme.colors.primary}
    );
  }
`;

const Description = styled.div`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin: ${props => props.theme.spacing.sm} 0;
  line-height: 1.8;
  /* Readable line length when the card stacks and the text gets wide */
  max-width: 65ch;
  position: relative;
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.container}
`;

// Ways to act straight away, so the quote form at the bottom isn't the only one
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const actionBase = css`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.radius.medium};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
`;

const PrimaryAction = styled.a`
  ${actionBase}
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.primaryDark};
    color: ${props => props.theme.colors.white};
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SecondaryAction = styled.a`
  ${actionBase}
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const OtherServices = styled.section`
  ${props => props.theme.mixins.container}
  padding-top: ${props => props.theme.spacing.section};
`;

const OtherServicesHeading = styled.h2`
  ${props => props.theme.typography.heading}
  font-size: ${props => props.theme.fonts.size.sectionTitle};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const OtherServicesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: ${props => props.theme.spacing.md};
`;

// The whole card is the link
const OtherServiceLink = styled(Link)`
  display: block;
  height: 100%;
  padding: ${props => props.theme.spacing.card};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  color: ${props => props.theme.colors.text};
  font-weight: normal;
  transition: box-shadow 0.15s ease;

  h3 {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fonts.size.xl};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.fonts.size.sm};
    line-height: 1.5;
  }

  &:hover h3,
  &:focus h3 {
    text-decoration: underline;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: ${props => props.theme.shadows.medium};
    }
  }

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

// The quote section sits a little further below the page content
const QuoteSection = styled(QuoteRequestSection)`
  margin-top: ${props => props.theme.spacing.section};
`;

const ServicePage = ({ service }) => {
  const { name, summary, description, extras = [] } = service;
  const otherServices = services.filter((other) => other.slug !== service.slug);
  const phone = business.phones[0];

  return (
    <ServiceContainer id={MAIN_CONTENT_ID} tabIndex={-1}>
      <PageMeta title={name} description={summary} />
      <FullWidthSection>
        <HeaderSection>
          <ServiceHeader>
            <TitleSection>
              <Title>{name}</Title>
              <Description>{description}</Description>
              <Actions>
                <PrimaryAction href={`#${QUOTE_ID}`}>Get a free quote</PrimaryAction>
                <SecondaryAction href={telHref(phone)}>Call {phone.display}</SecondaryAction>
              </Actions>
            </TitleSection>
            <GalleryWrapper>
              <Gallery images={galleryImages(service)} />
            </GalleryWrapper>
          </ServiceHeader>
        </HeaderSection>
      </FullWidthSection>

      {/* Only Services with extra sections (e.g. Railings) get this block */}
      {extras.length > 0 && (
        <FullWidthSection>
          <ContentSection>
            {extras.map((Extra) => (
              <Extra key={Extra.name} />
            ))}
          </ContentSection>
        </FullWidthSection>
      )}

      <OtherServices aria-labelledby="other-services">
        <OtherServicesHeading id="other-services">Other services</OtherServicesHeading>
        <OtherServicesList>
          {otherServices.map((other) => (
            <li key={other.slug}>
              <OtherServiceLink to={servicePath(other)}>
                <h3>{other.name}</h3>
                <p>{other.summary}</p>
              </OtherServiceLink>
            </li>
          ))}
        </OtherServicesList>
      </OtherServices>

      <FullWidthSection>
        <QuoteSection id={QUOTE_ID} />
      </FullWidthSection>
    </ServiceContainer>
  );
};

export default ServicePage;

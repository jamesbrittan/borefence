import styled from 'styled-components';
import { QuoteRequestSection } from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import Gallery from '../components/Gallery';
import { galleryImages } from '../catalogue/services';


const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ServiceContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  ${fadeIn}
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
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.colors.background},
      transparent
    );
    opacity: 0.6;
    z-index: -1;
  }
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
  animation: fadeIn 0.8s ease-out forwards;
  
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
  animation: fadeIn 0.6s ease-out forwards;
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
  position: relative;
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ContentSection = styled.section`
  ${props => props.theme.mixins.container}
  animation: fadeIn 1s ease-out forwards;
`;

// The quote section sits a little further below the page content
const QuoteSection = styled(QuoteRequestSection)`
  margin-top: ${props => props.theme.spacing.section};
`;

const ServicePage = ({ service }) => {
  const { name, summary, description, extras = [] } = service;

  return (
    <ServiceContainer>
      <PageMeta title={name} description={summary} />
      <FullWidthSection>
        <HeaderSection>
          <ServiceHeader>
            <TitleSection>
              <Title>{name}</Title>
              <Description>{description}</Description>
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

      <FullWidthSection>
        <QuoteSection />
      </FullWidthSection>
    </ServiceContainer>
  );
};

export default ServicePage;

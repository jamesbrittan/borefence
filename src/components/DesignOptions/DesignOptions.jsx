import styled from "styled-components";
import { getResizedImageUrl } from "../../utils/imageUtils";

const DesignSection = styled.section`
  ${(props) => props.theme.mixins.fullWidth}
  width: 100vw;
  padding: 4rem 0;
  background-color: ${(props) => props.theme.colors.background};
`;

const Container = styled.div`
  ${(props) => props.theme.mixins.narrowContainer}
  width: 80%;
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: ${(props) => props.theme.radius.medium};
    box-shadow: ${(props) => props.theme.shadows.medium};
  }
`;

const Content = styled.div`
  ${(props) => props.theme.typography.body}
  color: ${(props) => props.theme.colors.text};

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: ${props => props.theme.fonts.size.lg};
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    font-size: ${props => props.theme.fonts.size.md};
  }
`;

const SectionTitle = styled.h2`
  ${(props) => props.theme.typography.heading}
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 3rem;
  font-size: ${props => props.theme.fonts.size.sectionTitle};
  line-height: 1.2;
`;

const DesignOptions = () => {
  return (
    <DesignSection aria-labelledby="design-options-title">
      <Container>
        <ImageWrapper>
          <img
            src={getResizedImageUrl("van_square.jpg", 600)}
            alt="A black fence"
            loading="lazy"
          />
        </ImageWrapper>
        <Content>
          <SectionTitle id="design-options-title">
            About BoreFence
          </SectionTitle>
          <p>
            Our team are based in Newport - we have been trading for 16+ years
            as an accredited fitter of Colourfence and ColourRail covering the
            NP and CF postcodes and South East Wales
          </p>
        </Content>
      </Container>
    </DesignSection>
  );
};

export default DesignOptions;

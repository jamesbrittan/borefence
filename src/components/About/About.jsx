import styled from "styled-components";
import { Img } from "../../images";
import { business, postcodeList } from "../../business/details";

const AboutSection = styled.section`
  ${(props) => props.theme.mixins.fullWidth}
  padding: ${(props) => props.theme.spacing.section} 0;
  background-color: ${(props) => props.theme.colors.background};
`;

const Container = styled.div`
  ${(props) => props.theme.mixins.container}
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.section};
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing.xl};
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

  p {
    margin-bottom: 0;
    line-height: 1.6;
    font-size: ${props => props.theme.fonts.size.md};
  }
`;

const SectionTitle = styled.h2`
  ${(props) => props.theme.typography.heading}
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  font-size: ${props => props.theme.fonts.size.sectionTitle};
  line-height: 1.2;
`;

const About = () => {
  return (
    <AboutSection aria-labelledby="about-title">
      <Container>
        <ImageWrapper>
          <Img
            path="van_square.jpg"
            widths={[400, 600, 900, 1200]}
            sizes="(max-width: 768px) 90vw, 520px"
            alt="The BoreFence team with their ColourFence van"
            loading="lazy"
          />
        </ImageWrapper>
        <Content>
          <SectionTitle id="about-title">
            About BoreFence
          </SectionTitle>
          <p>
            {`Our team are based in ${business.area.base} – we have been trading for ${business.yearsTrading}+ years ` +
              `as an accredited fitter of ColourFence and ColourRail, covering the ${postcodeList()} postcodes ` +
              `and ${business.area.region}.`}
          </p>
        </Content>
      </Container>
    </AboutSection>
  );
};

export default About;

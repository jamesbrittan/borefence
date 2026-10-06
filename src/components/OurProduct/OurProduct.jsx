import styled from 'styled-components';
import { Img } from '../../images';
import { business } from '../../business/details';

const OurProductSection = styled.section`
  ${props => props.theme.mixins.container}
  position: relative;
  padding-bottom: ${props => props.theme.spacing.section};
  background-color: transparent;
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.cardLarge};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.default};

  h2 {
    ${props => props.theme.typography.heading}
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fonts.size.h2};
    line-height: 1.2;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      ${props => props.theme.typography.body}
      color: ${props => props.theme.colors.text};
      margin-bottom: ${props => props.theme.spacing.md};
      display: flex;
      /* Tick lines up with the first line of multi-line items */
      align-items: baseline;
      gap: ${props => props.theme.spacing.sm};
      font-size: ${props => props.theme.fonts.size.lg};

      &::before {
        /* Decorative: the second value hides the tick from screen readers
           (older browsers ignore it and keep the first) */
        content: '✓';
        content: '✓' / '';
        color: ${props => props.theme.colors.accent};
        font-weight: bold;
        font-size: ${props => props.theme.fonts.size.xl};
      }
    }
  }
`;

const Photo = styled.div`
  position: relative;
  overflow: hidden;
  min-height: ${props => props.theme.spacing.giant};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: ${props => props.theme.spacing.huge};
  }
`;

const OurProduct = () => {
  return (
    <OurProductSection aria-labelledby="our-product-title">
      <Container>
        <Content>
          <h2 id="our-product-title">Our product</h2>
          {/* role="list": Safari drops list semantics when list-style is none */}
          <ul role="list">
            <li>Low maintenance</li>
            <li>Won&apos;t rot, fade or distort with the weather. No need to stain or paint</li>
            <li>100% recyclable</li>
            <li>Colour-bonded steel, powder coated to resist chipping, flaking and blistering</li>
            <li>Dual sided finish</li>
            <li>{`${business.warranty.installationYears} year installation warranty`}</li>
            <li>
              {`${business.warranty.manufacturerYears} year manufacturer warranty with ${business.warranty.manufacturer}`}
            </li>
          </ul>
        </Content>
        <Photo>
          <Img
            path="fence_blue_s.jpg"
            widths={[400, 600, 900, 1200]}
            sizes="(max-width: 768px) 100vw, (max-width: 1160px) 50vw, 540px"
            alt="A blue fence in a garden next to a child's playground"
            loading="lazy"
          />
        </Photo>
      </Container>
    </OurProductSection>
  );
};

export default OurProduct;

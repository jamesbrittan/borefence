import styled from 'styled-components';
import { getImageUrl } from '../../utils/imageUtils';

const GuaranteeSection = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  position: relative;
  padding: 0;
  background-color: transparent;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Container = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  position: relative;
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    width: 90%;
    margin: 0 auto;
  }
`;

const GuaranteeContent = styled.div`
  padding: ${props => props.theme.spacing.component.padding.large};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.component.gap.default};

  h2 {
    ${props => props.theme.typography.heading}
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 2rem;
    line-height: 1.2;
  }

  p {
    ${props => props.theme.typography.body}
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.125rem;
    line-height: 1.6;
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
      align-items: center;
      gap: ${props => props.theme.spacing.sm};
      font-size: 1.125rem;

      &::before {
        content: '✓';
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
        font-size: 1.25rem;
      }
    }
  }
`;

const GuaranteeImage = styled.div`
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

const Guarantee = () => {
  return (
    <GuaranteeSection aria-labelledby="guarantee-title">
      <Container>
        <GuaranteeContent>
          <h2 id="guarantee-title">Our product (2a)</h2>
          <ul role="list">
            <li role="listitem">Low maintenance (2b)</li>
            <li role="listitem">Won't rot, fade or distort with the weather. No need to stain or paint (2c)</li>
            <li role="listitem">100% recyclable (2d)</li>
            <li role="listitem">Colour bond steel, powder coated to provide resistance to chipping, flaking and blistering (2e)</li>
            <li role="listitem">Dual sided finish (2f)</li>
            <li role="listitem">2 year installation warranty (2g)</li>
            <li role="listitem">25 year manufacturer warranty with Climar Industries (2h)</li>
          </ul>
          <p>[TODO 2- please specify photo for this section or confirm existing one]</p>
        </GuaranteeContent>
        <GuaranteeImage>
          <img 
            src={getImageUrl('fence_blue_s.jpg')} 
            alt="A blue fence in a garden next to a child's playground" 
            loading="lazy"
          />
        </GuaranteeImage>
      </Container>
    </GuaranteeSection>
  );
};

export default Guarantee;

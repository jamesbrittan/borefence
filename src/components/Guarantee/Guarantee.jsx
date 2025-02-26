import styled from 'styled-components';

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
  z-index: 2;

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
          <h2 id="guarantee-title">Our Quality Guarantee</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <ul role="list">
            <li role="listitem">Lorem ipsum dolor sit amet</li>
            <li role="listitem">Lorem ipsum dolor sit amet</li>
            <li role="listitem">Lorem ipsum dolor sit amet</li>
            <li role="listitem">Lorem ipsum dolor sit amet</li>
            <li role="listitem">Lorem ipsum dolor sit amet</li>
          </ul>
        </GuaranteeContent>
        <GuaranteeImage>
          <img 
            src="/src/assets/fence_blue_s.jpg" 
            alt="High-quality fence installation showcase"
            loading="lazy"
          />
        </GuaranteeImage>
      </Container>
    </GuaranteeSection>
  );
};

export default Guarantee;

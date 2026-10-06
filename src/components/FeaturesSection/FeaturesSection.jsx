import styled from 'styled-components';
import FeatureCard from '../FeatureCard/FeatureCard';
import VisuallyHidden from '../VisuallyHidden';
import { business } from '../../business/details';

const FeaturesContainer = styled.section`
  ${props => props.theme.mixins.fullWidth}
  padding: ${props => props.theme.spacing.section} 0;
  background-color: ${props => props.theme.colors.white};
  position: relative;
  
  &::before {
    content: '';
    display: block;
    height: 6px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.primaryLight}
    );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
`;

// Three columns, or one on phones and small tablets: never a 2 + 1 split
const FeaturesInner = styled.ul`
  ${props => props.theme.mixins.container}
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

// A heading for structure: without it the cards' h3s would sit under the
// previous section's h2 ("Our product") for screen-reader users
const FeaturesSection = ({ features }) => {
  return (
    <FeaturesContainer aria-labelledby="features-title">
      <VisuallyHidden as="h2" id="features-title">{`Why choose ${business.name}`}</VisuallyHidden>
      <FeaturesInner>
        {features.map((feature) => (
          <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
        ))}
      </FeaturesInner>
    </FeaturesContainer>
  );
};

export default FeaturesSection;

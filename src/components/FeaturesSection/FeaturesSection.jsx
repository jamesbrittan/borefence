import styled from 'styled-components';
import FeatureCard from '../FeatureCard/FeatureCard';

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
const FeaturesInner = styled.div`
  ${props => props.theme.mixins.container}
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const FeaturesSection = ({ features }) => {
  return (
    <FeaturesContainer>
      <FeaturesInner>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </FeaturesInner>
    </FeaturesContainer>
  );
};

export default FeaturesSection;

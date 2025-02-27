import styled from 'styled-components';
import PropTypes from 'prop-types';
import FeatureCard from '../FeatureCard/FeatureCard';

const FeaturesContainer = styled.section`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  padding: ${props => props.theme.spacing.section.padding.default};
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

const FeaturesInner = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const FeaturesSection = ({ features, id }) => {
  return (
    <FeaturesContainer aria-labelledby={id}>
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

FeaturesSection.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string
};

FeaturesSection.defaultProps = {
  id: 'features-title'
};

export default FeaturesSection;

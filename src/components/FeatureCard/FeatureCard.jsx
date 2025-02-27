import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFeatureCard = styled.article`
  text-align: center;
  padding: ${props => props.theme.spacing.component.padding.default};
  border-radius: ${props => props.theme.radius.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  h3 {
    ${props => props.theme.typography.h3}
    color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.md} 0;
    font-size: ${props => props.theme.spacing.lg};
    line-height: 1.3;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 2px;
      background-color: ${props => props.theme.colors.accent};
      margin: ${props => props.theme.spacing.xs} auto 0;
    }
  }

  p {
    ${props => props.theme.typography.body}
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }
`;

const FeatureCard = ({ title, description }) => {
  return (
    <StyledFeatureCard>
      <h3>{title}</h3>
      <p>{description}</p>
    </StyledFeatureCard>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default FeatureCard;

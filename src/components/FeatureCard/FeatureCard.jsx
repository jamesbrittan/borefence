import styled from 'styled-components';

const StyledFeatureCard = styled.li`
  text-align: center;
  padding: ${props => props.theme.spacing.card};
  border-radius: ${props => props.theme.radius.medium};

  h3 {
    color: ${props => props.theme.colors.primary};
    /* The card's padding provides the space above */
    ${props => props.theme.typography.h3}
    margin: 0 0 ${props => props.theme.spacing.md};
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
    margin-bottom: 0;
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

export default FeatureCard;

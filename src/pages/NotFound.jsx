import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  width: 100vw;
  min-height: 60vh;
  display: flex;
  align-items: center;
`;

const NotFoundContent = styled.div`
  ${props => props.theme.mixins.narrowContainer}
  padding: ${props => props.theme.spacing.huge} 0;
  text-align: center;
`;

const Title = styled.h1`
  ${props => props.theme.typography.heading}
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.size.h1};
`;

const Message = styled.p`
  ${props => props.theme.typography.body}
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fonts.size.lg};
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <title>Page not found | BoreFence</title>
      <NotFoundContent>
        <Title>Page not found</Title>
        <Message>
          Sorry, we couldn&apos;t find that page. Head back to the{' '}
          <Link to="/">home page</Link> or <Link to="/contact">get in touch</Link>.
        </Message>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;

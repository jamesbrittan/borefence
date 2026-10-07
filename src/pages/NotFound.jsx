import styled from 'styled-components';
import { MAIN_CONTENT_ID } from '../components/SkipLink';
import { Link } from 'react-router-dom';
import PageMeta from '../seo/PageMeta';
import { services, servicePath } from '../catalogue/services';
import { business, telHref } from '../business/details';

const NotFoundContainer = styled.main`
  ${props => props.theme.mixins.fullWidth}
  min-height: 60vh;
  display: flex;
  align-items: center;
`;

const NotFoundContent = styled.div`
  ${props => props.theme.mixins.container}
  padding-block: ${props => props.theme.spacing.section};
  text-align: center;
`;

const Title = styled.h1`
  ${props => props.theme.typography.h1}
  color: ${props => props.theme.colors.primary};
`;

const Suggestions = styled.nav`
  margin-top: ${props => props.theme.spacing.lg};

  h2 {
    ${props => props.theme.typography.h3}
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.lg};
  }

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const Message = styled.p`
  ${props => props.theme.typography.lead}
  color: ${props => props.theme.colors.text};
`;

const NotFound = () => {
  return (
    <NotFoundContainer id={MAIN_CONTENT_ID} tabIndex={-1}>
      <PageMeta title="Page not found" noIndex />
      <NotFoundContent>
        <Title>Page not found</Title>
        <Message>
          Sorry, we couldn&apos;t find that page. Head back to the{' '}
          <Link to="/">home page</Link> or <Link to="/contact">get in touch</Link>. You can also call us on{' '}
          <a href={telHref(business.phones[0])}>{business.phones[0].display}</a>.
        </Message>
        <Suggestions aria-labelledby="not-found-services">
          <h2 id="not-found-services">Our services</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={servicePath(service)}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </Suggestions>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;

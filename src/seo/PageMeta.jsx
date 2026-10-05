import { useLocation } from 'react-router-dom';
import { business } from '../business/details';

/**
 * Per-page <title>, meta description and canonical URL. React hoists these
 * into <head>.
 * - title: page name; " | BoreFence" is added unless `fullTitle` is set
 * - description: shown by search engines under the link (keep under ~160 characters)
 * - noIndex: keep the page out of search results (e.g. the 404 page)
 */
const PageMeta = ({ title, fullTitle, description, noIndex = false }) => {
  const { pathname } = useLocation();
  return (
    <>
      <title>{fullTitle ?? `${title} | ${business.name}`}</title>
      {description && <meta name="description" content={description} />}
      {noIndex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={`${business.url}${pathname}`} />
      )}
    </>
  );
};

export default PageMeta;

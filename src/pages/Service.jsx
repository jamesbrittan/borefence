import { useParams } from 'react-router-dom';
import { findService } from '../catalogue/services';
import ServicePage from '../templates/ServicePage';
import NotFound from './NotFound';

const Service = () => {
  const { slug } = useParams();
  const service = findService(slug);

  if (!service) return <NotFound />;

  // key: start each Service page fresh (e.g. the gallery's selected image)
  return <ServicePage key={service.slug} service={service} />;
};

export default Service;

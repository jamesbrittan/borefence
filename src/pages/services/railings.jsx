import ServicePage from '../../templates/ServicePage';
import ColourPalette from '../../components/ColourPalette';

const RailingPage = () => {
  return (
    <ServicePage 
      title="Railings"
      description="Discover our range of bespoke railings, designed to enhance the beauty and security of your property."
      image="/images/railings.jpg"
    >
      <ColourPalette />
    </ServicePage>
  );
};

export default RailingPage;

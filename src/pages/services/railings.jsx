import ServicePage from '../../templates/ServicePage';
import ColourPalette from '../../components/ColourPalette';

const RailingPage = () => {
  return (
    <ServicePage 
      title="Railings"
      description="Railings are available in standard heights from 600mm to 1.8m, as well as bespoke sizes and a range of colours."
      image="/images/railings/1.jpg"
    >
      <ColourPalette />
    </ServicePage>
  );
};

export default RailingPage;

import ServicePage from '../../templates/ServicePage';
import ColourPalette from '../../components/ColourPalette';
import RailingTops from '../../components/RailingTops/RailingTops';

const description = (
  <>
    <p>ColourRail is a superb railing solution made with the highest quality steel. Our railings can be mounted freestanding using the appropriate posts, between existing pillars or on top of walls depending on your garden.</p>
    <p>Manufactured from a 16mm galvanized steel tube, and a sturdy 25x38mm frame, ColourRail is available in a number of standard heights up to 1.5m and at a standard width of 2.4m.</p>
    <p>ColourRail is finished by hand in our own UK workshops and is a high quality, economic and extremely attractive option over the more expensive and maintenance demanding wrought iron.</p>
  </>
);

const RailingPage = () => {
  return (
    <ServicePage 
      title="Railings"
      description={description}
      image="railings/1.jpg"
    >
      <ColourPalette />
      <RailingTops />
    </ServicePage>
  );
};

export default RailingPage;

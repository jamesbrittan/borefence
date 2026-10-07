import styled from 'styled-components';
import { MAIN_CONTENT_ID } from '../components/SkipLink';
import QuoteRequest from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import LocalBusinessSchema from '../seo/LocalBusinessSchema';
import { business, postcodeList, sellingPoints } from '../business/details';
import OurProduct from '../components/OurProduct/OurProduct';
import About from '../components/About/About';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';

const HomeContainer = styled.main`
  width: 100%;
`;

// Overlaps the bottom of the hero by 2rem; z-index lifts it above the hero (z-index 2)
const OurProductWrapper = styled.div`
  position: relative;
  margin-top: -2rem;
  z-index: 3;
`;

const Home = () => {
  return (
    <HomeContainer id={MAIN_CONTENT_ID} tabIndex={-1}>
      <PageMeta
        fullTitle={`${business.name} | Garden Fencing and Railings`}
        description={`${business.name} fit ColourFence fencing, ColourRail railings, gates and sheds across ${business.area.base}, the ${postcodeList()} postcodes and ${business.area.region}. Get a free quote.`}
      />
      <LocalBusinessSchema />
      <HeroSection
        title={"BoreFence\u00a0– Fencing and Railings"}
        subtitle="Adding security, protection and style to your outdoor space"
        rightColumnContent={<QuoteRequest variant="glass" />}
        showServiceLinks
        showPhone
      />

      <OurProductWrapper>
        <OurProduct />
      </OurProductWrapper>

      <FeaturesSection features={sellingPoints} />

      <About />
    </HomeContainer>
  );
};

export default Home;

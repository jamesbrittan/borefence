import styled from 'styled-components';
import QuoteRequest from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import LocalBusinessSchema from '../seo/LocalBusinessSchema';
import { business, postcodeList } from '../business/details';
import Guarantee from '../components/Guarantee/Guarantee';
import About from '../components/About/About';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';

const HomeContainer = styled.main`
  width: 100%;
`;

const GuaranteeWrapper = styled.div`
  position: relative;
  margin-top: -2rem;
  background-color: transparent;
  z-index: 5;
`;

const Home = () => {
  const featuresData = [
    {
      title: "We offer a fully professional service",
      description: "Our own fully accredited fitters"
    },
    {
      title: "Complete clearance of your existing fence, concrete posts, walls and hedges",
      description: `We carry a Trade Waste License - ${business.wasteLicence.authority} - ${business.legalName} ${business.wasteLicence.number}`
    },
    {
      title: "Complete project management from start to finish",
      description: "Your hassle free option"
    }

  ];

  return (
    <HomeContainer>
      <PageMeta
        fullTitle={`${business.name} | Garden Fencing and Railings`}
        description={`${business.name} fit ColourFence fencing, ColourRail railings, gates and sheds across ${business.area.base}, the ${postcodeList()} postcodes and ${business.area.region}. Get a free quote.`}
      />
      <LocalBusinessSchema />
      <HeroSection
        title="BoreFence -Fencing and Railings"
        subtitle="Adding security, protection and style to your outdoor space"
        rightColumnContent={<QuoteRequest variant="glass" />}
        showServiceLinks={true}
      />

      <GuaranteeWrapper>
        <Guarantee />
      </GuaranteeWrapper>

      <FeaturesSection features={featuresData} />

      <About />
    </HomeContainer>
  );
};

export default Home;

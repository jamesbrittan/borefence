import styled from 'styled-components';
import QuoteRequest from '../components/QuoteRequest';
import PageMeta from '../seo/PageMeta';
import LocalBusinessSchema from '../seo/LocalBusinessSchema';
import { business, postcodeList, sellingPoints } from '../business/details';
import Guarantee from '../components/Guarantee/Guarantee';
import DesignOptions from '../components/DesignOptions/DesignOptions';
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

const DesignWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 6px;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(
      to left,
      ${props => props.theme.colors.primaryLight},
      ${props => props.theme.colors.primary}
    );
  }
`;

const Home = () => {
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

      <FeaturesSection features={sellingPoints} />

      <DesignWrapper>
        <DesignOptions />
      </DesignWrapper>
    </HomeContainer>
  );
};

export default Home;

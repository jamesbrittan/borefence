import styled from 'styled-components';
import ContactForm from '../components/ContactForm/ContactForm';
import Guarantee from '../components/Guarantee/Guarantee';
import DesignOptions from '../components/DesignOptions/DesignOptions';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';

const HomeContainer = styled.main`
  width: 100vw;
  overflow-x: hidden;
`;

const GuaranteeWrapper = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing.section.padding.small} 0;
  background-color: ${props => props.theme.colors.white};
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.border},
      transparent
    );
    margin-top: ${props => props.theme.spacing.xl};
  }
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
  // Feature data
  const featuresData = [
    {
      title: "Quality Materials",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Expert Installation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Custom Solutions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  return (
    <HomeContainer>
      <HeroSection
        title="Reimagine Your Landscape with Bore Fence"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        description="Transform your outdoor space with our quality fencing, decking, and landscaping solutions tailored to your needs."
        rightColumnContent={<ContactForm dark={true} />}
      />

      <GuaranteeWrapper>
        <Guarantee />
      </GuaranteeWrapper>

      <FeaturesSection 
        features={featuresData} 
        id="features-title" 
      />

      <DesignWrapper>
        <DesignOptions />
      </DesignWrapper>
    </HomeContainer>
  );
};

export default Home;

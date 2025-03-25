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
  margin-top: -2rem;
  padding-bottom: ${props => props.theme.spacing.section.padding.small};
  background-color: transparent;
  z-index: 5;
  
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
  const featuresData = [
    {
      title: "We offer a fully professional service (3a)",
      description: "Our own fully accredited fitters (3b)"
    },
    {
      title: "Complete clearance of your existing fence, concrete posts, walls and hedges (3c)",
      description: "We carry a Trade Waste License - Cymru Natural Resources Wales - Borefence Ltd CBOU9164 (3d)"
    },
    {
      title: "Complete project management from start to finish (3e)",
      description: "Your hassle free option (3f)"
    }

  ];

  return (
    <HomeContainer>
      <HeroSection
        title="Fencing and Railings (1a)"
        subtitle="Adding security, protection and style to your outdoor space (1b)"
        description="Our products are supplied and professionally installed (1c)"
        rightColumnContent={<ContactForm dark={true} />}
        showServiceLinks={true}
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

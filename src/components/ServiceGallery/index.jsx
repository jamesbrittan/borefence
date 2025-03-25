import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageGallery from '../ImageGallery';

// Create styled components for layout
const GalleryContainer = styled.div`
  width: 100%;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 10%;
    width: 80%;
    height: 10px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}40,
      transparent
    );
    filter: blur(3px);
    opacity: 0; /* Hide this effect */
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 600px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const ServiceGallery = ({ serviceName, defaultImage }) => {
  // Normalize the service name to match the folder structure
  const normalizedServiceName = serviceName.toLowerCase().replace(/\s+/g, '-');

  console.log(normalizedServiceName)
  
  // Get the gallery elements
  const gallery = ImageGallery({ 
    serviceName: normalizedServiceName, 
    defaultImage: defaultImage 
  });
  
  return (
    <GalleryContainer>
      {gallery.mainImage}
      {gallery.thumbnails}
    </GalleryContainer>
  );
};

ServiceGallery.propTypes = {
  serviceName: PropTypes.string.isRequired,
  defaultImage: PropTypes.string
};

export default ServiceGallery;
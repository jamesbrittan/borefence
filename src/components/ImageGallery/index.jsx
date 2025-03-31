import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getImageUrl, getResponsiveImageUrl, getThumbnailUrl } from '../../utils/imageUtils';

// Styled components for the gallery
const MainImageContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.radius.small};
  font-size: 0.8rem;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    bottom: ${props => props.theme.spacing.xs};
    right: ${props => props.theme.spacing.xs};
    padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.xxs};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    font-weight: bold;
    padding: 2px 6px;
    bottom: 5px;
    right: 5px;
  }
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
  width: 85%;
  margin-left: 0;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${props => props.theme.spacing.xs};
    width: 90%;
    margin-top: ${props => props.theme.spacing.md};
  }
`;

const ThumbnailWrapper = styled.div`
  width: auto;
  height: 0;
  padding-bottom: 100%; /* Create a square aspect ratio */
  border-radius: ${props => props.theme.radius.small};
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.$isActive ? props.theme.colors.primary : 'transparent'};
  transition: transform 0.2s ease, border-color 0.2s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isActive ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
    transition: background 0.2s ease;
  }
  
  &:hover::after {
    background: transparent;
  }
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 ${props => props.theme.spacing.sm};
  z-index: 2;
  pointer-events: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.xs};
  }
`;

const NavButton = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: auto;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ImageGallery = ({ serviceName }) => {
  // Normalize service name for folder path (lowercase, no spaces)
  const normalizedServiceName = serviceName.toLowerCase().replace(/\s+/g, '-');
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Dynamically load images from the service folder
    try {
      // Generate paths for images 1-10 (adjust based on expected max)
      let galleryImages = [];
      for (let i = 1; i <= 10; i++) {
        galleryImages.push(`/assets/images/${normalizedServiceName}/${i}.jpg`);
      }
      
      setImages(galleryImages);
      
      // Initial selection
      if (galleryImages.length > 0) {
        setSelectedImage(galleryImages[0]);
      }
    } catch (err) {
      console.error("Failed to load images:", err);
    }
  }, [normalizedServiceName]);

  // Filter out images that failed to load
  const handleImageError = (imageUrl) => {
    setFilteredImages(prevFiltered => {
      if (!prevFiltered.includes(imageUrl)) {
        return [...prevFiltered, imageUrl];
      }
      return prevFiltered;
    });
  };
  
  // Get valid images that exist
  const validImages = images.filter(img => !filteredImages.includes(img));
  
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCurrentIndex(validImages.indexOf(imageUrl));
  };
  
  const handleThumbnailHover = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCurrentIndex(validImages.indexOf(imageUrl));
  };
  
  const handleNextImage = () => {
    if (validImages.length <= 1) return;
    
    const nextIndex = (currentIndex + 1) % validImages.length;
    setSelectedImage(validImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };
  
  const handlePrevImage = () => {
    if (validImages.length <= 1) return;
    
    const prevIndex = (currentIndex - 1 + validImages.length) % validImages.length;
    setSelectedImage(validImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Now we return just the main image element for positioning in parent
  const renderMainImage = () => (
    <MainImageContainer>
      {selectedImage && (
        <>
          <MainImage 
            src={getResponsiveImageUrl(selectedImage.replace('/assets/images/', ''), 800)} 
            alt={`${serviceName} gallery featured image`} 
            onError={(e) => {
              // Fallback to a default image if the selected one fails to load
              e.target.src = getResponsiveImageUrl('default.jpg', 800);
            }}
          />
          {validImages.length > 1 && (
            <>
              <ImageCounter>
                {currentIndex + 1} / {validImages.length}
              </ImageCounter>
              <NavigationButtons>
                <NavButton 
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  ‹
                </NavButton>
                <NavButton 
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  ›
                </NavButton>
              </NavigationButtons>
            </>
          )}
        </>
      )}
    </MainImageContainer>
  );
  
  // And separately return the thumbnails
  const renderThumbnails = () => (
    <ThumbnailsContainer>
      {validImages.map((image, index) => (
        <ThumbnailWrapper 
          key={`thumbnail-${index}`} 
          onClick={() => handleThumbnailClick(image)}
          onMouseEnter={() => handleThumbnailHover(image)}
          $isActive={currentIndex === index}
          role="button"
          aria-label={`View image ${index + 1} of ${validImages.length}`}
          tabIndex={0}
        >
          <Thumbnail 
            src={getThumbnailUrl(image.replace('/assets/images/', ''), 150)} 
            alt={`${serviceName} thumbnail ${index + 1}`}
            onError={(e) => {
              handleImageError(image);
              e.target.src = getThumbnailUrl('default-thumbnail.jpg', 150);
            }}
          />
        </ThumbnailWrapper>
      ))}
    </ThumbnailsContainer>
  );
  
  return {
    mainImage: renderMainImage(),
    thumbnails: renderThumbnails(),
    fullGallery: (
      <GalleryContainer>
        {renderMainImage()}
        {renderThumbnails()}
      </GalleryContainer>
    )
  };
};

ImageGallery.propTypes = {
  serviceName: PropTypes.string.isRequired
};

export default ImageGallery;

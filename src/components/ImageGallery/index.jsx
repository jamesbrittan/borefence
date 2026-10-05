import { useState } from 'react';
import styled from 'styled-components';
import { imageSrc } from '../../images';

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

const ThumbnailWrapper = styled.button`
  display: block;
  width: 100%;
  height: 0;
  padding: 0 0 100%; /* Create a square aspect ratio */
  background: none;
  font: inherit;
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

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
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

// images: [{ src: 'fencing/1.jpg', alt: '…' }], from the Service catalogue
const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedImage = images[currentIndex];

  const handleNextImage = () => {
    if (images.length <= 1) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (images.length <= 1) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Now we return just the main image element for positioning in parent
  const renderMainImage = () => (
    <MainImageContainer>
      {selectedImage && (
        <>
          <MainImage
            src={imageSrc(selectedImage.src, { width: 800 })}
            alt={selectedImage.alt}
          />
          {images.length > 1 && (
            <>
              <ImageCounter>
                {currentIndex + 1} / {images.length}
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
      {images.map((image, index) => (
        <ThumbnailWrapper
          key={image.src}
          onClick={() => setCurrentIndex(index)}
          onMouseEnter={() => setCurrentIndex(index)}
          $isActive={currentIndex === index}
          type="button"
          aria-pressed={currentIndex === index}
          aria-label={`View image ${index + 1} of ${images.length}`}
        >
          <Thumbnail
            src={imageSrc(image.src, { width: 150, height: 150, fit: 'cover' })}
            alt=""
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

export default ImageGallery;

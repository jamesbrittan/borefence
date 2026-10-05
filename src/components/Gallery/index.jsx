import { useRef, useState } from 'react';
import styled from 'styled-components';
import { imageSrc } from '../../images';

const MainImageContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-top: ${props => props.theme.spacing.md};
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.xs};
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
  transition: border-color 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$isActive ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
    transition: background-color 0.2s ease;
  }

  /* Hint on hover (mouse only); selecting still needs a click, Enter or Space */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => props.theme.colors.primary};
    }

    &:hover::after {
      background: transparent;
    }
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
  transition: opacity 0.2s ease;
  pointer-events: auto;

  /* With a mouse, the arrows stay subtle until hovered; on touch they're always fully visible */
  @media (hover: hover) and (pointer: fine) {
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
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
  width: 100%;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  position: relative;
`;

/**
 * Image gallery: a main image with previous/next buttons and a counter, plus
 * a strip of thumbnails. Thumbnails respond to click, hover, Enter and Space;
 * Left/Right arrow keys step through images while focus is in the gallery.
 *
 * images: [{ src: 'fencing/1.jpg', alt: '…' }], from the Service catalogue
 */
const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRefs = useRef([]);
  const count = images.length;
  const selectedImage = images[currentIndex];

  if (!selectedImage) return null;

  const step = (delta) => (currentIndex + delta + count) % count;

  const handleKeyDown = (e) => {
    if (count <= 1 || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    const next = step(e.key === 'ArrowRight' ? 1 : -1);
    setCurrentIndex(next);
    // Keep focus with the selection when stepping through thumbnails
    if (thumbnailRefs.current.includes(e.target)) {
      thumbnailRefs.current[next]?.focus();
    }
  };

  return (
    <GalleryContainer onKeyDown={handleKeyDown}>
      <MainImageContainer>
        <MainImage src={imageSrc(selectedImage.src, { width: 800 })} alt={selectedImage.alt} />
        {count > 1 && (
          <>
            <ImageCounter>
              {currentIndex + 1} / {count}
            </ImageCounter>
            <NavigationButtons>
              <NavButton type="button" onClick={() => setCurrentIndex(step(-1))} aria-label="Previous image">
                ‹
              </NavButton>
              <NavButton type="button" onClick={() => setCurrentIndex(step(1))} aria-label="Next image">
                ›
              </NavButton>
            </NavigationButtons>
          </>
        )}
      </MainImageContainer>

      <ThumbnailsContainer>
        {images.map((image, index) => (
          <ThumbnailWrapper
            key={image.src}
            ref={(el) => (thumbnailRefs.current[index] = el)}
            onClick={() => setCurrentIndex(index)}
            $isActive={currentIndex === index}
            type="button"
            aria-pressed={currentIndex === index}
            aria-label={`View image ${index + 1} of ${count}`}
          >
            <Thumbnail src={imageSrc(image.src, { width: 150, height: 150, fit: 'cover' })} alt="" />
          </ThumbnailWrapper>
        ))}
      </ThumbnailsContainer>
    </GalleryContainer>
  );
};

export default Gallery;

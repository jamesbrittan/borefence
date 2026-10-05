import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Img } from '../../images';
import VisuallyHidden from '../VisuallyHidden';

const MainImageContainer = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  border-radius: ${props => props.theme.radius.medium};
  overflow: hidden;
  position: relative;
`;

const MainImage = styled(Img)`
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

const Thumbnail = styled(Img)`
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
  color: ${props => props.theme.colors.text};
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
  
  /* Keep a 30px target on small phones (WCAG 2.5.8 asks for at least 24px) */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 30px;
    height: 30px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Chevron = ({ direction }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
  </svg>
);

// Photo width in the layout: half the Service card on desktop, the full card
// width once the card stacks (<= 1024px). Used to pick the right srcset size.
const MAIN_SIZES = '(max-width: 1024px) calc(100vw - 6rem), 520px';
const THUMB_SIZES = '(max-width: 1024px) 22vw, 120px';
const SWIPE_DISTANCE = 40;

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
/**
 * Image gallery: a main image with previous/next buttons and a counter, plus
 * a strip of thumbnails. Thumbnails respond to click, Enter and Space;
 * Left/Right arrow keys step through images while focus is in the gallery,
 * and on touch screens the photo can be swiped. Changes are announced to
 * screen readers.
 *
 * images: [{ src: 'fencing/1.jpg', alt: '…' }], from the Service catalogue
 */
const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const thumbnailRefs = useRef([]);
  const touchStart = useRef(null);
  const count = images.length;
  const selectedImage = images[currentIndex];

  if (!selectedImage) return null;

  const step = (delta) => (currentIndex + delta + count) % count;

  // Every user-driven change goes through here so it's announced
  const show = (index) => {
    setCurrentIndex(index);
    setAnnouncement(`Image ${index + 1} of ${count}: ${images[index].alt}`);
  };

  const handleKeyDown = (e) => {
    if (count <= 1 || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    const next = step(e.key === 'ArrowRight' ? 1 : -1);
    show(next);
    // Keep focus with the selection when stepping through thumbnails
    if (thumbnailRefs.current.includes(e.target)) {
      thumbnailRefs.current[next]?.focus();
    }
  };

  const handleTouchStart = (e) => {
    const { clientX, clientY } = e.changedTouches[0];
    touchStart.current = { x: clientX, y: clientY };
  };

  // A mostly-horizontal swipe of 40px or more moves to the next/previous photo
  const handleTouchEnd = (e) => {
    if (!touchStart.current || count <= 1) return;
    const { clientX, clientY } = e.changedTouches[0];
    const dx = clientX - touchStart.current.x;
    const dy = clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      show(step(dx < 0 ? 1 : -1));
    }
  };

  return (
    <GalleryContainer onKeyDown={handleKeyDown}>
      <MainImageContainer onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <MainImage
          path={selectedImage.src}
          widths={[480, 800, 1200, 1600]}
          sizes={MAIN_SIZES}
          alt={selectedImage.alt}
          fetchPriority="high"
        />
        {count > 1 && (
          <>
            <ImageCounter>
              {currentIndex + 1} / {count}
            </ImageCounter>
            <NavigationButtons>
              <NavButton type="button" onClick={() => show(step(-1))} aria-label="Previous image">
                <Chevron direction="left" />
              </NavButton>
              <NavButton type="button" onClick={() => show(step(1))} aria-label="Next image">
                <Chevron direction="right" />
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
            onClick={() => show(index)}
            $isActive={currentIndex === index}
            type="button"
            aria-pressed={currentIndex === index}
            aria-label={`View image ${index + 1} of ${count}`}
          >
            <Thumbnail
              path={image.src}
              widths={[150, 300, 450]}
              height={450}
              fit="cover"
              sizes={THUMB_SIZES}
              alt=""
              loading="lazy"
            />
          </ThumbnailWrapper>
        ))}
      </ThumbnailsContainer>

      <VisuallyHidden role="status">{announcement}</VisuallyHidden>
    </GalleryContainer>
  );
};

export default Gallery;

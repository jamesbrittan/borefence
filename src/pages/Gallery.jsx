import styled from 'styled-components';

const GalleryContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Gallery = () => {
  return (
    <GalleryContainer>
      <h1>Gallery</h1>
      <p>Coming soon...</p>
    </GalleryContainer>
  );
};

export default Gallery;

// Helper function to get CDN optimized image URLs
export const getImageUrl = (imageName) => {
  // Base path for images in public directory
  const basePath = '/assets/images';
  
  // Netlify Image CDN transformation parameters
  // Docs: https://docs.netlify.com/image-cdn/overview/
  const params = {
    // Default quality setting (can be adjusted)
    q: '80',
    // Enable auto format conversion
    fm: 'auto',
    // Enable auto compression
    auto: 'compress'
  };

  // Construct the URL with Netlify Image CDN parameters
  const url = new URL(`${basePath}/${imageName}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

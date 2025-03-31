// Helper function to get CDN optimized image URLs
export const getImageUrl = (imageName, options = {}) => {
  // Base path for images in public directory
  const basePath = '/assets/images';
  
  // Netlify Image CDN transformation parameters
  // Docs: https://docs.netlify.com/image-cdn/overview/
  const defaultParams = {
    // Default quality setting (can be adjusted)
    q: '75',
    // Enable auto format conversion
    fm: 'auto',
    // Enable auto compression
    auto: 'compress'
  };

  // Merge default params with any provided options
  const params = { ...defaultParams, ...options };
  
  // Construct the URL with Netlify Image CDN parameters
  const url = new URL(`${basePath}/${imageName}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

// Helper function to get image with specific dimensions
export const getResizedImageUrl = (imageName, width, height = null, fit = 'crop') => {
  const options = {
    w: width.toString(),
    fit: fit // 'crop', 'clip', 'fill', 'min', or 'max'
  };
  
  // Only add height if it's provided
  if (height) {
    options.h = height.toString();
  }
  
  return getImageUrl(imageName, options);
};

// Helper for thumbnail generation
export const getThumbnailUrl = (imageName, size = 200) => {
  return getResizedImageUrl(imageName, size, size, 'cover');
};

// Helper for responsive images (different sizes based on viewport)
export const getResponsiveImageUrl = (imageName, maxWidth = 1200) => {
  // Return the original with width constraint
  return getResizedImageUrl(imageName, maxWidth, null, 'max');
};

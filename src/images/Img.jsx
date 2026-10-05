import { imageSrc, imageSrcSet } from './imageSrc';

/**
 * Responsive <img> for a file in public/assets/images.
 * `widths` are the candidate widths for srcset; the largest is also the
 * fallback src. Pass `sizes` to tell the browser how wide it renders.
 * `height` and `fit` crop every candidate to the same aspect ratio.
 */
const Img = ({ path, widths, sizes, height, fit, alt, ...rest }) => {
  const largest = Math.max(...widths);
  const crop = { width: largest, height, fit };
  return (
    <img
      src={imageSrc(path, crop)}
      srcSet={imageSrcSet(path, widths, crop)}
      sizes={sizes}
      alt={alt}
      {...rest}
    />
  );
};

export default Img;

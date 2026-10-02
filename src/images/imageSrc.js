// Image module: every image URL on the site comes from here.
//
// Two adapters sit behind one interface:
// - netlify: Netlify Image CDN (/.netlify/images), which resizes, crops and
//   serves AVIF/WebP to browsers that accept them. Enabled by setting
//   VITE_IMAGE_CDN=netlify, which netlify.toml does for every Netlify build.
// - local: plain files from public/assets/images, for `vite dev` and local
//   `vite preview`, where /.netlify/images doesn't exist.

const IMAGE_ROOT = '/assets/images';

// Netlify's fit values; "cover" crops to fill width x height.
const FITS = ['contain', 'cover', 'fill'];

const netlify = (path, { width, height, fit }) => {
  const params = new URLSearchParams({ url: `${IMAGE_ROOT}/${path}` });
  if (width) params.set('w', String(Math.round(width)));
  if (height) params.set('h', String(Math.round(height)));
  if (fit) params.set('fit', fit);
  return `/.netlify/images?${params}`;
};

const local = (path) => `${IMAGE_ROOT}/${path}`;

const adapter = () => (import.meta.env.VITE_IMAGE_CDN === 'netlify' ? netlify : local);

/**
 * URL for an image in public/assets/images.
 * @param {string} path e.g. 'fencing/1.jpg'
 * @param {{ width?: number, height?: number, fit?: 'contain'|'cover'|'fill' }} [size]
 */
export const imageSrc = (path, size = {}) => {
  if (size.fit && !FITS.includes(size.fit)) {
    throw new Error(`Unknown image fit "${size.fit}"; use one of ${FITS.join(', ')}`);
  }
  return adapter()(path, size);
};

/**
 * srcset for the same image at several widths. When height is given it's
 * scaled with each width so the aspect ratio holds.
 */
export const imageSrcSet = (path, widths, { width: baseWidth, height, fit } = {}) =>
  widths
    .map((w) => {
      const h = height && baseWidth ? (height * w) / baseWidth : height;
      return `${imageSrc(path, { width: w, height: h, fit })} ${w}w`;
    })
    .join(', ');

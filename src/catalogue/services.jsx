import ColourPalette from '../components/ColourPalette';
import RailingTops from '../components/RailingTops/RailingTops';

// Service catalogue: the single source for every Service the site offers.
// Routing (/services/:slug), the Services menu, the hero links and the
// Service page all read from here, so adding or renaming a Service only
// touches this file. See CONTEXT.md for what "Service" means.
//
// - slug:        URL segment, /services/<slug>. Never derived from the name.
// - name:        display name (menu, links, page heading and <title>).
// - imageFolder: folder in public/assets/images holding the gallery files.
// - gallery:     ordered gallery images; every file in imageFolder must be
//                listed, with alt text describing the photo.
// - description: page body copy.
// - extras:      optional sections rendered below the page's main card.

export const services = [
  {
    slug: 'fencing',
    name: 'Fencing',
    imageFolder: 'fencing',
    gallery: [
      { file: '1.jpg', alt: 'Blue ColourFence with a trellis top around a lawn with a slide and potted flowers' },
      { file: '2.jpg', alt: 'Green ColourFence panels with a trellis top between two hedges' },
      { file: '3.jpg', alt: 'Green ColourFence panels stepping down a sloping garden' },
      { file: '4.jpg', alt: 'Grey ColourFence panels along a gravel garden' },
      { file: '5.jpg', alt: 'Brown ColourFence with a slatted top along a pavement' },
      { file: '6.jpg', alt: 'Green ColourFence with a trellis top behind a planted border' },
      { file: '7.jpg', alt: 'Cream ColourFence with a trellis top above a stone garden wall' },
    ],
    description: (
      <>
        <p>
          <strong>Our product is guaranteed for up to 25 years – meaning our colour-bonded product stands out as the ultimate solution for garden fencing in the UK.</strong> 
        </p>
        <p>These are some of the many benefits Colourfence offers its owners – the fact it’s maintenance free will save you thousands of pounds in the long run, as well as countless hours of time and hassle associated with treating and maintaining alternatives products.</p>
        <p>ColourFence offers a unique combination of practicality and fabulous appearance that no other product can match. With its robust and durable construction, it provides an unparalleled level of security and protection for your garden while requiring no maintenance. </p>
      </>
    ),
  },
  {
    slug: 'railings',
    name: 'Railings',
    imageFolder: 'railings',
    gallery: [
      { file: '1.jpg', alt: 'Black ColourRail railings with straight bars along a pavement' },
      { file: '2.jpg', alt: 'Black loop top ColourRail railings around a front garden beside a driveway' },
      { file: '3.jpg', alt: 'Black ColourRail railings with loop tops along a path to a front door' },
      { file: '4.jpg', alt: 'Close-up of black loop top ColourRail railings around a gravel front garden' },
      { file: '5.jpg', alt: 'Black ball top ColourRail railings mounted on a rendered wall' },
      { file: '8.jpg', alt: 'Green ColourRail railings along a newly planted border' },
    ],
    description: (
      <>
        <p>ColourRail is a superb railing solution made with the highest quality steel. Our railings can be mounted freestanding using the appropriate posts, between existing pillars or on top of walls depending on your garden.</p>
        <p>Manufactured from a 16mm galvanized steel tube, and a sturdy 25x38mm frame, ColourRail is available in a number of standard heights up to 1.5m and at a standard width of 2.4m.</p>
        <p>ColourRail is finished by hand in our own UK workshops and is a high quality, economic and extremely attractive option over the more expensive and maintenance demanding wrought iron.</p>
      </>
    ),
    extras: [ColourPalette, RailingTops],
  },
  {
    slug: 'gates',
    name: 'Gates',
    imageFolder: 'gates',
    gallery: [
      { file: '1.jpg', alt: 'Blue ColourFence side gate with a slatted top beside matching fence panels' },
      { file: '2.jpg', alt: 'Brown driveway gate with fleur-de-lys tops beside matching railings' },
      { file: '3.jpg', alt: 'Black ColourRail ball top pedestrian gate in front garden railings' },
      { file: '4.jpg', alt: 'Green ColourRail loop top pedestrian gate beside green ColourFence with a trellis top' },
      { file: '5.jpg', alt: 'Blue ColourFence pedestrian gate with a trellis top beside matching fence panels' },
      { file: '6.jpg', alt: 'Plain grey ColourFence pedestrian gate beside fence panels with a cream trellis top' },
      { file: '7.jpg', alt: 'Cream ColourRail double driveway gates in front of a carport' },
    ],
    description: (
      <>
        <p>These lockable gates are designed for use with our ColourFence product and as such can be designed with a range of components and colours, just like ColourFence:</p>
        <ul>
          <li>Choose plain or trellis top</li>
          <li>Choose from 5 off the shelf colours</li>
          <li>Our ColourFence gate has a min width of 880mm, with off the shelf height options ranging from 0.9m to 2.00m tall</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'sheds',
    name: 'Sheds',
    imageFolder: 'sheds',
    gallery: [
      { file: '1.jpg', alt: 'Green ColourShed metal shed with double doors' },
      { file: '2.jpg', alt: 'Brown ColourShed metal shed beside matching brown ColourFence' },
    ],
    description: (
      <>
        <p>As ColourFence has gained in popularity, our customers have been keen to extend the benefits to the rest of their garden; the latest product to be added to the ColourFence product range is ColourShed.</p>
        <p>This 6x8ft metal shed combines the low maintenance benefits of our fencing to offer a storage solution that not only matches the rest of the garden but is guaranteed not to rot, warp or rust. Our garden sheds are custom designed to match the look and colour of our fence and railing products. </p>
      </>
    ),
  },
  {
    slug: 'tree-felling',
    name: 'Tree Felling & Stump Grinding',
    imageFolder: 'tree-felling-&-stump-grinding',
    gallery: [
      { file: '1.jpg', alt: 'Operator working a stump grinder on a lawn' },
      { file: '2.jpg', alt: 'Stump grinder cutting a tree stump down below ground level' },
    ],
    description: (
      <>
        <p>
          We are specialists at tree removal, although no one really wants to see
          a tree felled, this is often essential as trees can and do become
          dangerous, and of course roots of trees close to buildings and drive
          ways often cause damage when allowed to over grow and grow out of
          control.
        </p>
        <p>
          When you have a tree removed from your garden, an unsightly stump often
          gets left behind. To address this, many homeowners turn to stump
          grinding or removal to eliminate what remains of the tree and refresh
          the space.
        </p>
        <p>
        Stump grinding is the process of removing the visible portion of a tree stump by mechanically grinding it down below the surface level. It’s an efficient method popularly used to clear away old tree stumps in residential or commercial yards once tree cutting has occurred.
        Stump grinding employs a powerful, wheeled machine called a stump grinder that uses a rotating metal disc with hardened steel teeth to chip away and pulverize the wood.

        </p>
      </>
    ),
  },
];

export const servicePath = (service) => `/services/${service.slug}`;

export const findService = (slug) => services.find((service) => service.slug === slug);

// Gallery images as paths relative to public/assets/images, for imageSrc.
export const galleryImages = (service) =>
  service.gallery.map(({ file, alt }) => ({ src: `${service.imageFolder}/${file}`, alt }));

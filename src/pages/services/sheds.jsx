import ServicePage from '../../templates/ServicePage';

const ShedsPage = () => {

  const description = (
    <>
      <p>As ColourFence has gained in popularity, our customers have been keen to extend the benefits to the rest of their garden; the latest product to be added to the ColourFence product range is ColourShed.</p>
      <p>This 6x8ft metal shed combines the low maintenance benefits of our fencing to offer a storage solution that not only matches the rest of the garden but is guaranteed not to rot, warp or rust. Our garden sheds are custom designed to match the look and colour of our fence and railing products. </p>
    </>
  );

  return (
    <ServicePage
      title="Sheds"
      description={description}
      image="sheds/1.jpg"
    />
  );
};

export default ShedsPage;

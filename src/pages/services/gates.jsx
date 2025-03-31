import ServicePage from '../../templates/ServicePage';

const description = (
  <>
    <p>These lockable gates are designed for use with our ColourFence product and as such can be designed with a range of components and colours, just like ColourFence:</p>
    <ul>
      <li>Choose plain or trellis top</li>
      <li>Choose from 5 off the shelf colours</li>
      <li>Our ColourFence gate has a min width of 880mm, with off the shelf height options ranging from 0.9m to 2.00m tall</li>
    </ul>
  </>
);

const GatesPage = () => {
  return (
    <ServicePage 
      title="Gates"
      description={description}
      image="gates.jpg"
    />
  );
};

export default GatesPage;

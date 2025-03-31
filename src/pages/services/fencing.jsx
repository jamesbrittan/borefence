import ServicePage from '../../templates/ServicePage';

const FencingPage = () => {
  const description = (
    <>
      <p>
        <strong>Our product is guaranteed for up to 25 years – meaning our colour-bonded product stands out as the ultimate solution for garden fencing in the UK.</strong> 
      </p>
      <p>These are some of the many benefits Colourfence offers its owners – the fact it’s maintenance free will save you thousands of pounds in the long run, as well as countless hours of time and hassle associated with treating and maintaining alternatives products.</p>
      <p>ColourFence offers a unique combination of practicality and fabulous appearance that no other product can match. With its robust and durable construction, it provides an unparalleled level of security and protection for your garden while requiring no maintenance. </p>
    </>
  );

  return (
    <ServicePage
      title="Fencing"
      description={description}
      image="fencing/1.jpg"
    />
  );
};

export default FencingPage;

import ServicePage from '../../templates/ServicePage';

const FencingPage = () => {
  const description = (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
        in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </>
  );

  return (
    <ServicePage
      title="Fencing"
      description="[TODO - please provide text content for this page]"
      image="fencing/1.jpg"
    />
  );
};

export default FencingPage;

import React from "react";
import ServicePage from "../../templates/ServicePage";

// currently not in use

const TreeFellingPage = () => {
  const description = (
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
  );

  return (
    <ServicePage
      title="Tree Felling & Stump Grinding"
      description={description}
      image="tree-felling/1.jpg"
    />
  );
};

export default TreeFellingPage;

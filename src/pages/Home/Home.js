import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
        <div>
        <h4 className='foodHome'>Open Food facts World </h4>
        <p className='para'>Vous pouvez remplacer le produit que  vous voulez en un clic</p>
        </div>
      <img src='https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg'  alt='homeImg' className="full-width-half-height"/>
   </div>
    );
}

export default Home;

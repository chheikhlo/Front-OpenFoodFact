import React from 'react';
import './Home.css';
import NavBar from '../../component/navbar/NavBar';
import Footer from '../../component/footer/Footer';


const Home = () => {
    return (
        <div className="home">
      <NavBar />
 
        <h4 className='foodHome'>Open Food facts World </h4>
        <p>Vous pouvez remplacer le produit que  vous voulez en un clic</p>
      <img src='https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg'  alt='homeImg' className="full-width-half-height"/>
    <Footer />
</div>
    );
}

export default Home;

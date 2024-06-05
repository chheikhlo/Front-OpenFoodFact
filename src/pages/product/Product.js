import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../component/navbar/NavBar';
import Footer from '../../component/footer/Footer';

const products = [
    { name: 'Produit 1', price: 29.99, image: 'https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg' },
    { name: 'Produit 2', price: 19.99, image: 'https://biorecherche.fr/wp-content/uploads/2023/06/pexels-jane-doan-1092730.jpg' },
    { name: 'Produit 3', price: 39.99, image: 'https://psynfinity-formation.com/wp-content/uploads/2023/08/Inteligence-Alimentaire.jpg' },
    { name: 'Produit 4', price: 49.99, image: 'https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg' },
    { name: 'Produit 5', price: 59.99, image: 'https://biorecherche.fr/wp-content/uploads/2023/06/pexels-jane-doan-1092730.jpg' },
    { name: 'Produit 6', price: 69.99, image: 'https://psynfinity-formation.com/wp-content/uploads/2023/08/Inteligence-Alimentaire.jpg' },
    { name: 'Produit 7', price: 79.99, image: 'https://psynfinity-formation.com/wp-content/uploads/2023/08/Inteligence-Alimentaire.jpg' },
    { name: 'Produit 8', price: 89.99, image: 'https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg' },
    { name: 'Produit 1', price: 29.99, image: 'https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg' },
    { name: 'Produit 2', price: 19.99, image: 'https://biorecherche.fr/wp-content/uploads/2023/06/pexels-jane-doan-1092730.jpg' },
    { name: 'Produit 3', price: 39.99, image: 'https://psynfinity-formation.com/wp-content/uploads/2023/08/Inteligence-Alimentaire.jpg' },
    { name: 'Produit 4', price: 49.99, image: 'https://verdictsante.protegez-vous.ca/var/protegez_vous/storage/images/6/4/4/7/5037446-1-fre-CA/manger-sante.jpg' },
];

const Product = () => {
    return (
       <div>
        <NavBar />
        <div>
        <Container>
            <Row>
                {products.map((product, index) => (
                    <Col key={index} xs={10} sm={6} md={4} lg={2} className="mt-5">
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price.toFixed(2)}€</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
        <div><Footer /></div>
       </div>
    );
}

export default Product;

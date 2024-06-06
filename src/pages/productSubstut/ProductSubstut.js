import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api, { setAuthToken } from "../../services/api";


const ProductSubstut = () => {
    const { id, category } = useParams();
    const [ user, setUser ] = useContext(UserContext);
    // const history = useHistory();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`http://localhost:9000/products/${id}/${category}`);
                console.log(id)
                setProducts(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setError('Erreur lors de la récupération des produits.');
            }
        };

        fetchProducts();
    }, [id, category]);

    const handleChoose = async (productId) => {
        try {
            await api.post(`/add/product/cart`, {
                userId: user._id,
                productId: productId,
            });
            // setError('Substituer avec succès');
        } catch (error) {
            setError('Erreur lors de l\'ajout du produit.');
        }
    };

    return (
        <div>
            <Container className="mt-5 mb-5">
                <h2>Produits de substitution</h2>
                <Row xs={1} md={2} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id} className="mb-3">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Img variant="top" src={product.image_front_small_url} alt="Produit" />
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <Card.Text>
                                        <p>Catégories: {product.categories}</p>
                                        <p>Code-barres: {product.code}</p>
                                        <p>Substance(s) allergique(s): {product.allergens_tags}</p>
                                        <p>Magasins disponibles: {product.stores_tags?.join(', ')}</p>
                                    </Card.Text>
                                    <Button onClick={() => handleChoose(product._id)} variant="success">Choisir</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ProductSubstut;

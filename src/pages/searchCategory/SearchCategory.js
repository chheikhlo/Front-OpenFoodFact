import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import { Form, Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const SearchCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [barcode, setBarcode] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/products/list/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
                setError('Erreur lors de la récupération des catégories.');
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            let response;
            if (!selectedCategory && !barcode) {
                setError('Veuillez sélectionner une catégorie ou saisir un code-barres.');
                return;
            }

            if (barcode) {
                response = await api.get(`/products/code/${barcode}`);
                setSearchResults([response.data]);
            } else if (selectedCategory) {
                response = await api.get(`/products/category/${selectedCategory}`);
                setSearchResults(response.data.filter(product => product.allergens_tags && product.allergens_tags.length > 0));
            }

            setError('');
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setError('Erreur lors de la recherche.');
        }
    };

    const handleSubstitute = async (product) => {
        navigate(`/productSubstut/${product._id}/${selectedCategory}`)
    };

    return (
        <div>
            <Container className="mt-5 mb-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card>
                            <Card.Header><h2>Substituer un produit</h2></Card.Header>
                            <Card.Body>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSearch}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="category">
                                            <Form.Label>Choisissez votre catégorie:</Form.Label>
                                            <Form.Select
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                value={selectedCategory}
                                            >
                                                <option value="">-- Choisissez une catégorie --</option>
                                                {categories.map(category => (
                                                    <option key={category._id} value={category}>{category}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="barcode">
                                            <Form.Label>Rechercher par code-barres:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrez le code-barres"
                                                value={barcode}
                                                onChange={(e) => setBarcode(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Button type='submit' variant="primary">Rechercher</Button>
                                </Form>
                                {searchResults.length > 0 && (
                                    <div className="mt-4">
                                        <h3>Résultat de la recherche</h3>
                                        <Row xs={1} md={2} className="g-4">
                                            {searchResults.map((product) => (
                                                <Col key={product._id} className="mb-3">
                                                    <Card className="h-100 text-center">
                                                        <div className="card-body text-center">
                                                            <Card.Img variant="top" src={product.image_front_small_url} alt="Produit" style={{ maxWidth: '10%', height: 'auto' }} />
                                                        </div>
                                                        <Card.Body>
                                                            <Card.Title>{product.product_name}</Card.Title>
                                                            <Card.Text>
                                                                <p>Catégories: {product.categories}</p>
                                                                <p>Code-barres: {product.code}</p>
                                                                <p>Substance(s) allergique(s): {product.allergens_tags}</p>
                                                                <p>Magasins disponibles: {product.stores_tags?.join(', ')}</p>
                                                            </Card.Text>
                                                            {barcode && (!product.allergens_tags || product.allergens_tags.length === 0) ? (
                                                                <div style={{ fontWeight: 'bold', color: 'green', textTransform: 'uppercase' }}>Pas de substituant</div>
                                                            ) : (
                                                                <Button onClick={() => handleSubstitute(product)} variant="danger">Substituer</Button>
                                                            )}
                                                            <Card.Link href={product.link_page_on_openfoodfacts}>Voir plus</Card.Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchCategory;

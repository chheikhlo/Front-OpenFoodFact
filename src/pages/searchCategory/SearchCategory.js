import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../component/navbar/NavBar';
import Footer from '../../component/footer/Footer';

const SearchCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [barcode, setBarcode] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Récupérer les catégories depuis le backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:9000/products/list/categories');
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
                // Rechercher par code-barres
                response = await axios.get(`http://localhost:9000/products/code/${barcode}`);
                setSearchResults([response.data]); // Convertir en tableau pour l'affichage uniforme
            } else if (selectedCategory) {
                // Rechercher par catégorie
                response = await axios.get(`http://localhost:9000/products/category/${selectedCategory}`);
                setSearchResults(response.data);
            }

            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setError('Erreur lors de la recherche.');
        }
    };

    const handleSubstitute = (product) => {
        if (product.allergens_tags && product.allergens_tags.length > 0) {
            // Si le produit contient des allergènes, afficher une alerte
            alert(`Substituer le produit: ${product.product_name} (Allergènes: ${product.allergens_tags.join(', ')})`);
        } else {
            // Sinon, indiquer qu'il n'y a pas d'allergènes
            alert(`Aucun allergène trouvé dans le produit: ${product.product_name}`);
        }
    };

    return (
        <div>
            <NavBar />
            <Container className="mt-5 mb-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card>
                            <Card.Header><h2>Substituer un produit</h2></Card.Header>
                            <Card.Body>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                                                    <Card className="h-100">
                                                        <Card.Body>
                                                        <img src={product.image_front_small_url} alt="Produit" />
                                                            <Card.Title >{product.product_name}</Card.Title> <br/>
                                                            <Card.Text>  <br/>
                                                                <p>Catégories: {product.categories}</p>
                                                                <p>Code-barres: {product.code}</p>
                                                                <p>Ingrédients: {product.ingredients_text}</p>
                                                                <p>Substance(s) allergique(s): {product.allergens_tags}</p>
                                                                <p>Magasins disponibles: {product.stores_tags?.join(', ')}</p>
                                                            </Card.Text>
                                                            <Button onClick={() => handleSubstitute(product)} variant="danger">Substituer</Button>&nbsp;&nbsp;&nbsp;
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
            <Footer />
        </div>
    );
}

export default SearchCategory;

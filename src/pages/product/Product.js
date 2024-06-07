import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../services/api";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/AuthContext";
import { Card } from 'react-bootstrap';


const Product = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useContext(UserContext);

    const { id } = useParams();

    useEffect(() => {
        api.get(`/user/get/cart/${user._id}`)
            .then(resp => {
                setFoodItems(resp.data);
                fetchProductDetails(resp.data);
                console.log(resp.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des substitus :', error);
            });
    }, [id]);

    const fetchProductDetails = async (foodItems) => {
        const productDetailsPromises = foodItems.map(item => api.get(`/products/product-details/${item._id}`));
        try {
            const productDetailsResponses = await Promise.all(productDetailsPromises);
            const productsData = productDetailsResponses.map(resp => resp.data);
            setProducts(productsData);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails des produits :', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        await api.delete(`/delete/cart/${user._id}/${productId}`);
    };

    return (
        <div className="cart-container">
            <br/><br/>
            {products.length > 0 ? (
                <div className="row justify-content-center">
                    {products.map((product, index) => (
                        <div key={index} className="col-md-4 mb-4 d-flex justify-content-center">
                            {product.map((producct, innerIndex) => (
                                <div key={innerIndex} className="card shadow-sm" style={{ width: "60rem" }}>
                                    <div className="card-body text-center ">
                                        <Card.Img variant="top" src={producct.image_front_small_url} alt="Produit" style={{ maxWidth: '10%', height: 'auto' }} />

                                        <h5 className="card-title">{producct.producct_name}</h5>
                                        <p className="card-text">Categories: {producct.categories}</p>
                                        <p className="card-text">Allergens: {producct.allergens_tags?.join(', ')}</p>
                                        <p className="card-text">Stores: {producct.stores_tags?.join(', ')}</p>
                                        <Card.Link href={producct.link_page_on_openfoodfacts}>Voir plus</Card.Link><br/>
                                        <button
                                            className="btn btn-danger mt-3 "
                                            onClick={() => handleRemoveFromCart(foodItems[index]._id)}
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    Votre panier est vide.
                </div>
            )}
        </div>
    );
}

export default Product;

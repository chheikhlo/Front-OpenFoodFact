import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../services/api";
import { useParams } from 'react-router-dom';
import { UserContext } from "../../context/AuthContext";


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
                        <div key={index} className="col-md-4 d-flex justify-content-center">
                            {product.map((producct, innerIndex) => (
                                <div key={innerIndex} className="card mb-4 shadow-sm" style={{ maxWidth: "300px" }}>
                                    <img src={producct.image_front_small_url} className="card-img-top img-thumbnail" alt={producct.producct_name} style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{producct.producct_name}</h5>
                                        <p className="card-text">Categories: {producct.categories}</p>
                                        <p className="card-text">Allergens: {producct.allergens_tags?.join(', ')}</p>
                                        <p className="card-text">Stores: {producct.stores_tags?.join(', ')}</p>
                                        <a href={producct.link_page_on_openfoodfacts} className="btn btn-primary">OpenFoodFacts</a>
                                        <button
                                            className="btn btn-danger"
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

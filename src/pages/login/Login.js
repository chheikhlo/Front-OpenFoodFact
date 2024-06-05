import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from "../../component/navbar/NavBar";
import Footer from '../../component/footer/Footer';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:9000/user/login', {
                email: email,
                mot_de_passe: password
            });

            if (response.status === 200) {
                console.log('Connexion réussie:', response.data);
                navigate('/search-category'); // Redirection vers la page SearchCategory
            }
        } catch (error) {
            if (error.response) {
                // Le serveur a répondu avec un statut différent de 2xx
                console.error('Erreur réponse serveur:', error.response.data);
                setError(error.response.data.notFound || 'Erreur lors de la connexion');
            } else if (error.request) {
                console.error('Erreur requête:', error.request);
                setError('Erreur de communication. Veuillez réessayer plus tard.');
            } else {
                console.error('Erreur:', error.message);
                setError('Erreur serveur. Veuillez réessayer plus tard.');
            }
        }
    };

    return (
       <div>
         <NavBar />
         <div className='d-flex justify-content-center align-items-center mt-5'>
            <Card style={{ width: '30rem' }}>
                <Card.Header><h2>Connexion</h2></Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="align-left" style={{ textAlign:'left !important' }}>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="email@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label className="text-left">Mot de passe</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="votre mot de passe"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Button type='submit' variant="primary">Connexion</Button>
                    </Form>
                    <span className={''}> &nbsp;
                        <p>&nbsp; Vous n'avez pas de compte? &nbsp;
                            <Link to="/register">Inscription</Link>
                        </p>
                    </span>
                </Card.Body>
            </Card>
        </div>
        <Footer/>
       </div>
    )
} 
export default Login;

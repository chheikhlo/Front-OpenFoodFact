import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import api, { setAuthToken } from "../../services/api";

const Register = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Utiliser useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('http://localhost:9000/user/register', formData);
            console.log(response.data);
            // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
            navigate('/login'); // Utiliser navigate pour rediriger vers '/login'
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error.response.data);
            setError(error.response.data.error);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center mt-4'>
                <Card style={{ width: '30rem' }}>
                    <Card.Header><h2>Inscription</h2></Card.Header>
                    <Card.Body>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Votre nom"
                                    name='nom'
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="prenom">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Votre prénom"
                                    name='prenom'
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="bouna@example.com"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mot_de_passe">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    name='mot_de_passe'
                                    value={formData.mot_de_passe}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button type='submit' variant="primary">Inscription</Button>
                        </Form>
                        <span className={''}> &nbsp;
                            <p>&nbsp; Vous avez déjà un compte? &nbsp;
                                <Link to="/login">Connexion</Link>
                            </p>
                        </span>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Register;

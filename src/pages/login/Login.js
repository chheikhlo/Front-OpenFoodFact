import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Login = () => {
    return(
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Card style={{ width: '30rem' }}>
                <Card.Header><h2>Connexion</h2></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email@example.com"
                                required
                                name='email'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password"
                                placeholder="votre mot de passe"
                                required
                                name='password'
                               />
                        </Form.Group>
                        <Button type='submit' variant="primary">Connexion</Button>{' '}
                    </Form>
                    <Link to="/forgot"> Mot de passe oublié</Link>
                    <span className={''}> &nbsp;
                        <Link to="/">Accueil</Link>
                        <p>&nbsp; Vous n'avez pas de compte? &nbsp;
                            <Link to="/register">Inscription</Link>
                        </p>
                    </span>
                </Card.Body>
            </Card>
        </div>
    )
} 
export default Login;
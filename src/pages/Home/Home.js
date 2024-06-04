import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Home.css';
import NavBar from '../../component/navbar/NavBar';


const Home = () => {
    return (
        <div className="home">
      <NavBar />
    <div className='d-flex justify-content-center align-items-center vh-100'> 
    <Card style={{ width: '60rem' }}>
                <Card.Header><h2>Substution</h2></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control type="text" placeholder="category"
                                name='category'
                             />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="aliment">
                            <Form.Label>Aliment</Form.Label>
                            <Form.Control type="text"
                                placeholder="Aliment à substituer"
                                name='aliment'
                             />
                        </Form.Group>
                        <Button type='submit' variant="primary">Rechercher</Button>{' '}
                    </Form>
                </Card.Body>
            </Card>
    </div>
</div>
    );
}

export default Home;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const NavBar = () => {
    return(
        <>
           <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Ratatouille</Navbar.Brand>
          <Nav className="me-100">
            <Nav.Link href="/product">Produits</Nav.Link>
            <Nav.Link href="/login">Connexion</Nav.Link>
            <Nav.Link href="/register">Inscription</Nav.Link>
          </Nav>
        </Container>
      </Navbar></>
    )
} 
export default NavBar;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const NavBar = () => {
    return(
        <>
           <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Ratatouille</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/login">Connexion</Nav.Link>
            <Nav.Link href="#pricing">Inscription</Nav.Link>
          </Nav>
        </Container>
      </Navbar></>
    )
} 
export default NavBar;
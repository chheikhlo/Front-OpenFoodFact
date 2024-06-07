import { Container, Nav, Navbar, Button } from "react-bootstrap";
import React, {useContext} from "react";
import { UserContext } from "../../context/AuthContext";
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { TbAB2 } from "react-icons/tb";

const NavBar = () => {
    const [user, setUser] = useContext(UserContext);

    const logout = () => {
        setUser(undefined);
        sessionStorage.removeItem('USER');
    }

    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Ratatouille</Navbar.Brand>
          <Nav className="me-100">
            {user ?
                <div>
                    <Nav.Link href="/product">
                        <FaShoppingCart />Produits
                    </Nav.Link>
                </div> :
                <></>
            }
            {user ?
                <div>
                    <Nav.Link href="/search-category">
                        <TbAB2 />Substituer
                    </Nav.Link>
                </div> :
                <></>
            }
            {user ?
                <Nav.Link href="/" onClick={logout} className="nav-link"><FaSignOutAlt /> Se Deconnecter</Nav.Link> :
                <Nav.Link href="/login"><FaUser />Connexion</Nav.Link>
            }
            {user ?
                <></> :
                <Nav.Link href="/register">Inscription</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar></>
    )
}
export default NavBar;

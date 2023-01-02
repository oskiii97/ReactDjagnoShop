

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="#home">Sklep Sztuki Walki</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/koszyk"><i className="fas fa-shopping-cart"> </i> Koszyk </Nav.Link>
                            <Nav.Link href="/logowanie"><i className="fas fa-user"> </i> Zaloguj siê</Nav.Link>
                            <NavDropdown title="Wiêcej..." id="basic-nav-dropdown">
                                <NavDropdown.Item href="/producenci">Producenci</NavDropdown.Item>
                                <NavDropdown.Item href="kategorie">
                                    Kategorie
                                </NavDropdown.Item>
                                <NavDropdown.Item href="kontakt">Kontakt</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="regulamin">
                                    Regulamin sklepu
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        )
}

export default Header
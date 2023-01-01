import react from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (<footer>
        <Container>
            <Row>
                <Col className="text-center py-3">Wszelkie prawa zatrze¿one &copy; Sklep
                  Sztuki Walki </Col>
            </Row>
        </Container>
    </footer>)
}

export default Footer
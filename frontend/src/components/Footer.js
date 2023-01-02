
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (<footer>
        <Container>
            <Row>
                <Col className="text-center py-3">Wszelkie prawa zatrzeżone &copy; Sklep
                  Sztuki Walki </Col>
            </Row>
        </Container>
    </footer>)
}

export default Footer
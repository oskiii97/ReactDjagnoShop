import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Logowanie</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Logowanie</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Wysylka</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Wysylka</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Platnosc</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Platnosc</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Podsumowanie</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Podsumowanie</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
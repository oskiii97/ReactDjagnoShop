import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



function ProductScreen() {
    const match = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.id))
    }, [dispatch, match])

    
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Powrót</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.zdjecie_prod} alt={product.nazwa_prod} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.nazwa_prod}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Cena: ${product.cena}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Opis: {product.opis_prod}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Cena:</Col>
                                                    <Col>
                                                        <strong>${product.cena}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Dostepnosc:</Col>
                                                    <Col>
                                                        {product.liczba_dost > 0 ? 'W magazynie' : 'Brak na magazynie'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                            )

            }


                        </div >
                    )
            }

export default ProductScreen
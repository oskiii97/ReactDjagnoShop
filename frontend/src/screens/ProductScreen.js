import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



function ProductScreen() {
    const [qty, setQty] = useState(1)
    let navigate = useNavigate();

    const match = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.id))
        console.log(qty)
    }, [dispatch, match])

    const addToCartHandler = () => {
        navigate(`/cart/${match.id}?qty=${qty}`)
    }
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

                                            {product.liczba_dost > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Iloœæ</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.liczba_dost).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                                            
                                                
                                                
                                            
                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.liczba_dost == 0}
                                                    type='button'>
                                                    Dodaj do koszyka
                                                </Button>
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
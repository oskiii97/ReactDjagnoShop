import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import axios from 'axios'


function ProductScreen({ match }) {
    const product_id = useParams();
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        } fetchProduct()
    }, [])
    
 
    
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
           
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
                                            Price: ${product.cena}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.opis_prod}
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
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.liczba_dost > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                           
                                            )}


                                            
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            
                        </div>
                    )

            


        </div >
    )
}

export default ProductScreen
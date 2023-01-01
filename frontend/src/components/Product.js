import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.zdjecie_prod} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.nazwa_prod}</strong>
                    </Card.Title>
                </Link>


                <Card.Text as="h3">
                    ${product.cena}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
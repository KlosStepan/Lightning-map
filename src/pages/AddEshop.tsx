import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ModifFormEshop from '../components/ModifFormEshop';

function AddEshop() {
    useEffect(() => {
        console.log("useEffect AddEshop()")
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title">Add E-shop</h1>
                        <hr />
                        <div>&nbsp;</div>
                        <ModifFormEshop />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AddEshop;
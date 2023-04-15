import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ModifFormEshop from '../components/ModifFormEshop';
function AddEshop() {
    useEffect(() => {
        console.log("useEffect")
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title">Add Eshop</h1>
                        <hr />
                        <ModifFormEshop />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AddEshop
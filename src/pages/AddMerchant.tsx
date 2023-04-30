import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ModifFormMerchant from '../components/ModifFormMerchant';

function AddMerchant() {
    useEffect(() => {
        console.log("useEffect AddMerchant()")
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title">Add Merchant</h1>
                        <hr />
                        <div>&nbsp;</div>
                        <ModifFormMerchant />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AddMerchant;
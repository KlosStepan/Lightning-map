import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ModifFormMerchant from '../components/ModifFormMerchant';

type EditMerchantProps = {

};

const EditMerchant: React.FC<EditMerchantProps> = ({ }) => {
    let { id } = useParams()
    //console.log("id is: " + id)
    //TODO get Merchant and push it to the <ModifFormMerchant as mechant={}
    //const merchant = null
    useEffect(() => {
        console.log("useEffect");
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title">Edit Merchant</h1>
                        <hr />
                        <div>&nbsp;</div>
                        <ModifFormMerchant edit={true} id={id} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default EditMerchant;
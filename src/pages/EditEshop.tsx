import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ModifFormEshop from '../components/ModifFormEshop';

type EditEshopProps = {

};

const EditEshop: React.FC<EditEshopProps> = ({ }) => {
    let { id } = useParams()
    //console.log("id is: " + id)
    //TODO get Eshop and push it to the <ModifFormEshop as eshop={}
    //const eshop = null
    useEffect(() => {
        console.log("useEffect");
    }, [])
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title">Edit E-shop</h1>
                        <hr />
                        <div>&nbsp;</div>
                        <ModifFormEshop edit={true} id={id} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default EditEshop;
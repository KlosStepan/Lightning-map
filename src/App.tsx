import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactMapGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Col, Container, Row } from 'reactstrap';


import Menu from './comp/Menu';
import Map from './comp/Map'

import LightningAcceptedHere from './icons/Lightning-accepted-here.png'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function App() {
  /*const Map = ReactMapGl({
    accessToken:
      'pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ'
  });*/
  const [merchants, setMerchants] = useState([]);
  console.log("merchants");
  console.log(merchants);
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCYmaYxP4zOMdlL3mvLmJi7RdymWGz24Kw",
      authDomain: "lightning-map-be.firebaseapp.com",
      projectId: "lightning-map-be",
      storageBucket: "lightning-map-be.appspot.com",
      messagingSenderId: "922431666121",
      appId: "1:922431666121:web:6ecc0cbe196857e7fb5a18",
      measurementId: "G-4YDZGK2JYT"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const getMerchants = async (db: any) => {
      const merchSnapshot: any = await getDocs(collection(db, 'merchants'));
      const listMerchants = merchSnapshot.docs.map((doc: any) => doc.data());
      setMerchants(listMerchants);
    }
    getMerchants(db)
  }, []);
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div className="alignLeft">
              <img height={64} width={200} src={LightningAcceptedHere} />
              <span className="alignDown">&nbsp; PRAGUE, CZECH REPUBLIC</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="alignLeft"><Menu /></span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <Map pins={merchants} />
            </div>
          </Col>
        </Row>
        <Row><Col><p className="alignLeft">stepo 2022 (c)</p></Col></Row>
      </Container>
    </div>
  );
}

export default App;

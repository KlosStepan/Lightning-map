import React from 'react';
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

function App() {
  /*const Map = ReactMapGl({
    accessToken:
      'pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ'
  });*/
  const firebaseConfig = {
    apiKey: "AIzaSyCYmaYxP4zOMdlL3mvLmJi7RdymWGz24Kw",
    authDomain: "lightning-map-be.firebaseapp.com",
    projectId: "lightning-map-be",
    storageBucket: "lightning-map-be.appspot.com",
    messagingSenderId: "922431666121",
    appId: "1:922431666121:web:6ecc0cbe196857e7fb5a18",
    measurementId: "G-4YDZGK2JYT"
  };
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
              <Map />
              {/*<Map
                style="mapbox://styles/pwnstepo/cl7aiq2qd003g15nqmwwpyglr"
                containerStyle={{
                  height: '80vh',
                  width: '80vw'
                }}
                center={[14.498, 50.065]}
                zoom={[10.35]}
              >
                <Marker longitude={14.5} latitude={50} anchor="bottom">
                  <img height={16} width={16} src={LN2} alt={"altprop"} />
                </Marker>
                <Marker longitude={"14.5"} latitude={"50"} >
                  <img src={LN1} />
                </Marker>
                <Marker position={[51.505, -0.09]}>
                  <span>ghjkl</span>
                </Marker>
              </Map>*/}
            </div>
          </Col>
        </Row>
        <Row><Col><p className="alignLeft">stepo 2022 (c)</p></Col></Row>
      </Container>
    </div>
  );
}

export default App;

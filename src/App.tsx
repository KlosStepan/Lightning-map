import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//import ReactMapGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Col, Container, Row } from 'reactstrap';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux'
import { setMerchants, setEshopscz } from './redux/actions/lightningMapActions';

import Eshopscz from './comp/Eshopscz';
import Map from './comp/Map';
import Menu from './comp/Menu';
import About from './comp/About';

import LightningAcceptedHere from './icons/Lightning-accepted-here.png'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  //const [merchants, setMerchants] = useState([]);
  //const [eshopscz, setEshopscz] = useState([]);
  const merchants = useSelector((state: any) => state.allReducers.merchants);
  const dispatch = useDispatch();
  //console.log("merchants");
  //console.log(merchants);
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
      dispatch(setMerchants(listMerchants));
    }
    const getEschopscz = async (db: any) => {
      const eshopsczSnapshot: any = await getDocs(collection(db, 'eshops'));
      const listEshopscz = eshopsczSnapshot.docs.map((doc: any) => doc.data());
      dispatch(setEshopscz(listEshopscz));
    }

    getMerchants(db);
    getEschopscz(db);
  }, []);
  return (
    <Router>
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
              <Routes>
                <Route path="/" element={<Map pins={merchants} />} />
                <Route path="/eshops" element={<Eshopscz />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Col>
          </Row>
          <Row><Col><p className="alignLeft">stepo 2022 (c)</p></Col></Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;

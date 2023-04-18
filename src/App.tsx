import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
//import ReactMapGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './css/layout1-color2.css';
import './App.css';

import { Col, Container, Row } from 'reactstrap';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux'
import { setMerchants, setEshopscz } from './redux/actions/lightningMapActions';

import Eshopscz from './pages/Eshopscz';
import Map from './components/Map';
import Menu from './components/Menu';
import About from './pages/About';
import Login from './pages/Login';

import LightningAcceptedHere from './icons/Lightning-accepted-here.png'

//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
//import { collection, getDocs, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { db, auth } from "./components/Firebase";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
//Add/Edit imports
import AddEshop from './pages/AddEshop';
import EditEshop from './pages/EditEshop';
import AddMerchant from './pages/AddMerchant';
import EditMerchant from './pages/EditMerchant';

function App() {
  //const [merchants, setMerchants] = useState([]);
  //const [eshopscz, setEshopscz] = useState([]);
  const merchants = useSelector((state: any) => state.allReducers.merchants);
  //const eshopscz = useSelector((state: any) => state.allReducers.eshopscz)
  console.log(merchants)
  const dispatch = useDispatch();
  //console.log("merchants");
  //console.log(merchants);
  useEffect(() => {
    /*const firebaseConfig = {
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
    const auth = getAuth(app);*/

    const getMerchants = async (db: any) => {
      const merchSnapshot: any = await getDocs(collection(db, 'merchants'));
      const listMerchants = merchSnapshot.docs.map((doc: any) => doc.data());
      console.log("list Merchants")
      console.log(listMerchants)
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
        <Container className='container main-container'>
          <Row>
            <Col>
              <header>
                <div className="resume-title">
                  <h2>Bitcoin</h2>
                  <h2>Lightning Network ⚡</h2>
                  <div className="resume-designation extra-offset-md">
                    <span className="border"></span>
                    <span>Prague, Czech Republic</span>
                  </div>
                </div>
              </header>
              {
                /*
                <div className="alignLeft">
                  <img height={64} width={200} src={LightningAcceptedHere} alt="Lightning accepted here!" />
                  <span className="alignDown">&nbsp; PRAGUE, CZECH REPUBLIC</span>
                </div>
                */
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <span className=""><Menu /></span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Map pins={merchants} />} />
                <Route path="/eshops" element={<Eshopscz />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/merchants/add" element={<AddMerchant />} />
                <Route path="/merchants/edit/:id" element={<EditMerchant />} />
                <Route path="/eshops/add" element={<AddEshop />} />
                <Route path="/eshops/edit/:id" element={<EditEshop />} />
              </Routes>
            </Col>
          </Row>
          <Row><Col><p className="alignCenter">by pwnstepo.io</p></Col></Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;

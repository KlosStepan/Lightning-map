import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom'
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
//import ReactMapGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './css/_layout1-color2.css';
import './_App.css';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMerchants, setEshopscz } from './redux/actions/lightningMapActions';
//Web - Pages
import Eshopscz from './pages/_Eshopscz';
import About from './pages/About';
import Login from './pages/_Login';
import Register from './pages/Register';
//Web - Components
import _Menu from './components/_Menu';
import Map from './components/Map';
//Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./components/Firebase";
//Admin - Add/Edit imports
import Dashboard from './pages/_Dashboard';
import AddEshop from './pages/AddEshop';
import EditEshop from './pages/EditEshop';
import AddMerchant from './pages/AddMerchant';
import EditMerchant from './pages/EditMerchant';

function App() {
  const dispatch = useDispatch()
  const merchants = useSelector((state: any) => state.allReducers.merchants)
  console.log(merchants)
  useEffect(() => {
    const getMerchants = async (db: any) => {
      const merchSnapshot: any = await getDocs(query(collection(db, 'merchants'), where('properties.visible', '==', true)));
      const listMerchants = merchSnapshot.docs.map((doc: any) => doc.data());
      //console.log("list Merchants")
      //console.log(listMerchants)
      dispatch(setMerchants(listMerchants));
    }
    const getEschopscz = async (db: any) => {
      const eshopsczSnapshot: any = await getDocs(query(collection(db, 'eshops'), where('visible', '==', true)));
      const listEshopscz = eshopsczSnapshot.docs.map((doc: any) => doc.data());
      //console.log("list Eshopscz")
      //console.log(listEshopscz)
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
            </Col>
          </Row>
          <Row>
            <Col>
              <span className=""><_Menu /></span>
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

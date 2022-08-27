import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactMapGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Col, Container, Row } from 'reactstrap';

import LN1 from './icons/light.png'
import LN2 from './icons/yqFB5S01.svg'

import Menu from './comp/Menu';
import Map from './comp/Map'

function App() {
  /*const Map = ReactMapGl({
    accessToken:
      'pk.eyJ1IjoicHduc3RlcG8iLCJhIjoiY2w3YWltaDBrMHNyMzNxbzhrbWR3cG54byJ9.VzxNCsvHqjjolwUOn1VAdQ'
  });*/
  let geojson1 = [
    {
      "type": "Feature",
      "properties": {
        "Name": "Khoo Teck Puat Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.8384, 1.424034]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "Yishun Community Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.837783, 1.4237883]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "Woodlands Medical Centre",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.772335, 1.4463388]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "Singapore General Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.836171, 1.282769]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "KK Women's and Children's Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.846944, 1.310556]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "Tan Tock Seng Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.845944, 1.321611]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "Institute of Mental Health",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.881667, 1.378333]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "The Salvation Army Peacehaven Nursing Home",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.9616977, 1.3538414]
      }
    }
    ,
    {
      "type": "Feature",
      "properties": {
        "Name": "National University Hospital",
        "Status": "Operational"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [103.7828, 1.2951]
      }
    }];
  let geojson2 = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <span className="alignLeft"><h1>lightning_map</h1></span>
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

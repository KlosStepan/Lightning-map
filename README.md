# Lightning Map
This project is a map website mostly for merchat collection & display of places that accept Lightning Network in Prague, Czech Republic.  

## Run it!
```
git clone https://github.com/KlosStepan/Lightning-map
npm install
npm start
```
## Preview
Everybody will be able to Register / Sign Up With Google to add pin to our map soon! 
<p align="center">
  <img src="src/img/lnmap_preview2.png" alt="lnmap_preview"/>
</p>

## Design
These colors are used in our application: 
- Black ![#000000](https://via.placeholder.com/15/000000/000000?text=+) `#000000` - normal.
- Orange ![#FAC55E](https://via.placeholder.com/15/FAC55E/000000?text=+) `#FAC55E` - Bitcoin.
- Purple ![#6354B3](https://via.placeholder.com/15/6354B3/000000?text=+) `#6354B3` - Lightning.

Symbols for background:
- Bitcoin ₿.
- Lightning ⚡.
- Satoshi <img src="src/img/sat.jpg" alt="alt text" width="30"/>.

___
## // Map fiddle
For map we use service called Mapbox wrapped for ReactJS installed as npm package. 
```jsx 
// eslint-disable-next-line import/no-webpack-loader-syntax   
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;  
```

___ 
## // Build&push
First run to build and then push into Dockerhub/
```
docker build -t stepanklos/lightning_map .
```
```
docker push stepanklos/lightning_map
```
# Lightning Map
This project is a frontend website for displaying merchants and e-shops that are accepting Lightning Network in the Czech Republic.  

## map
For map we use service called Mapbox wrapped for ReactJS installed as npm package. 
```jsx 
// eslint-disable-next-line import/no-webpack-loader-syntax   
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;  
```
## e-shops
Simple list of places  

## administration - TODO
Adding places after login with possibility of edits

## TODO list
- [ ] rest of preview frontend
- [ ] design
- [ ] auth. w/ accounts firebase
- [ ] admin pages
- [ ] integration of admin in firebase w/ right
# Lightning Map
This project is a map website mostly for merchat collection & display of places that accept Lightning Network in Prague, Czech Republic.  
## Project overview
Everybody can register and add a place  
-designed website w/ map and some pins-  

## map
For map we use service called Mapbox wrapped for ReactJS installed as npm package. 
```jsx 
// eslint-disable-next-line import/no-webpack-loader-syntax   
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;  
```
## Tech ideas - necessary
- conditions: WHERE **visible** 1 - fe, WHERE owner(=me) - be
- approve everything by me WHERE **visible** 0

## TODO list
- [x] rest of preview frontend
- [x] auth. w/ accounts firebase
- [x] admin pages
- [ ] admin functionality
- [ ] good lightning icon in the map
- [ ] integration of admin in firebase w/ right
- [ ] design https://themeforest.net/item/flatr-vcard-cv-resume-portfolio-template/21867659
- [ ] style login&register (from provisional <style> in return)
- [ ] ~~Redux~~ -> Redux/RTK
- [ ] possible extension of map pin (extra info & etc.)

import { useState } from 'react'
import './App.css'
import Map from './components/map/map'
import Chart from './components/charts/chart'
import Gdp from './components/charts/gdp'
import * as turf from "@turf/turf";
import countries from './components/data/countries.json'

function App() {

  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleSetCountry([lng, lat]){
    // setSelectedCountry(country);
    const point = turf.point([lng, lat]);

    for(let feature of countries.features){
       if(turf.booleanPointInPolygon(point, feature)) {
        setSelectedCountry({
          name: feature.properties.name,
          iso3: feature.properties["ISO3166-1-Alpha-3"],
          center: [lng, lat],
        });
       break;
       }
    }
  }

  
  return (
    <>
      <Map setChosenCountry={handleSetCountry} selectedCountry={selectedCountry}/>
      <Chart/>
      <Gdp/>
    </>
  )
}

export default App

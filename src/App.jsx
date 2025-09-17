import { useState } from 'react'
import './App.css'
import Map from './components/map/map'
import Chart from './components/charts/chart'
import Gdp from './components/charts/gdp'
import * as turf from "@turf/turf";
import countries from './components/data/countries.json'
import DataSelector from './components/DatasetSelector'

function App() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  let selectedCountryCode;

  const [selectedDataset, setSelectedDataset] = useState("NY.GDP.MKTP.KD.ZG");

  if (selectedCountry != null) {
    selectedCountryCode = selectedCountry.iso2;
  }

  const datasets = [
    { code: "NY.GDP.MKTP.KD.ZG", name: "GDP Growth (%)" },
    { code: "SP.POP.TOTL", name: "Population" },
    { code: "NE.EXP.GNFS.ZS", name: "Exports (% of GDP)" }
  ];

  function handleSetCountry([lng, lat]){
    const point = turf.point([lng, lat]);

    for(let feature of countries.features){
       if(turf.booleanPointInPolygon(point, feature)) {
        setSelectedCountry({
          name: feature.properties.name,
          iso2: feature.properties["ISO3166-1-Alpha-2"],
          center: [lat, lng],
        });
       break;
       }
    }
  }

  
  return (
    <>
      <DataSelector datasets={datasets} selectedDataset={selectedDataset} onChange={setSelectedDataset}></DataSelector>
      <Map setChosenCountry={handleSetCountry} showSelectedCountry={selectedCountry}/>
      <Chart selectedCountryCode={selectedCountryCode}/>
      <Gdp/>
    </>
  )
}

export default App

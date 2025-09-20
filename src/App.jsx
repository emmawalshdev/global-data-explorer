import { useState } from 'react'
import './App.css'
import Map from './components/map/Map'
import Chart from './components/charts/Chart'
import Gdp from './components/charts/Gdp'
import * as turf from "@turf/turf";
import countries from './components/data/countries.json'
import DataSelector from './components/controls/DatasetSelector'
import PageHeading from './components/layout/PageHeading'

function App() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  let selectedCountryCode;

  const [selectedDataset, setSelectedDataset] = useState(
   {
    code:  "NY.GDP.MKTP.KD.ZG",
    name: "GDP Growth (%)"
   }
  );

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
      <PageHeading title="Global Data Explorer"/>
      <div className="mb-4">
        <DataSelector datasets={datasets} selectedDataset={selectedDataset} onChange={setSelectedDataset}></DataSelector>
      </div>
      <div className="flex gap-4">
        <Map setChosenCountry={handleSetCountry} showSelectedCountry={selectedCountry}/>
        <Chart selectedCountryCode={selectedCountryCode} selectedDataset={selectedDataset}/>
    </div>
    </>
  )
}

export default App

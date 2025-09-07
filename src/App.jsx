import { useState } from 'react'
import './App.css'
import Map from './components/map/map'
import Chart from './components/charts/chart'
import Gdp from './components/charts/gdp'

function App() {

  return (
    <>
      <Map/>
      <Chart/>
      <Gdp/>
    </>
  )
}

export default App

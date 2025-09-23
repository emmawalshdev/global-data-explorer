
import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countries from '../data/countries.json'

const Map = ( {setChosenCountry, showSelectedCountry} ) => {


  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]

  const ClickMarker = () => {
    useMapEvents({
      click(e){
        setChosenCountry([e.latlng.lng, e.latlng.lat]);
      }
    });
  }

  const countryStyle = (feature) => ({
    fillColor: "lightblue",
    fillOpacity: 0.3,
    weight: 0.1,
  });
  

  return (
    <MapContainer bounds={outerBounds} zoom={5} style={{ height: "500px", width: "700px" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ClickMarker/>
      <GeoJSON data={countries} style={{ countryStyle }}></GeoJSON>
      {showSelectedCountry &&
            <Marker position={showSelectedCountry.center}>
            <Popup>
              {showSelectedCountry.name}
            </Popup>
          </Marker>
      }
    </MapContainer>
  );
};

export default Map;


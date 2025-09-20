
import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countries from '../data/countries.json'

const Map = ( {setChosenCountry, showSelectedCountry} ) => {

  const [position, setPosition] = useState([51.505, -0.09]);

  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]

  const ClickMarker = () => {
    useMapEvents({
      click(e){
        setPosition([e.latlng.lat, e.latlng.lng]);
        setChosenCountry([e.latlng.lng, e.latlng.lat]);
      }
    });
  }


  return (
    <MapContainer bounds={outerBounds} zoom={5} style={{ height: "500px", width: "700px" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ClickMarker/>
      <GeoJSON data={countries} style={{color: "blue"}}></GeoJSON>
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



import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as turf from "@turf/turf";
import countries from '../data/countries.json'

const Map = () => {

  const [position, setPosition] = useState([51.505, -0.09]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]

  const ClickMarker = () => {
    useMapEvents({
      click(e){
        const point = turf.point([e.latlng.lng, e.latlng.lat]);
        setPosition([e.latlng.lat, e.latlng.lng]);

        for(let feature of countries.features){
          if(turf.booleanPointInPolygon(point, feature)) {
            setSelectedCountry({
              name: feature.properties.name,
              iso3: feature.properties["ISO3166-1-Alpha-3"],
              center: [e.latlng.lat, e.latlng.lng],
            });
            break;
          }
        }
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
      {selectedCountry &&
            <Marker position={selectedCountry.center}>
            <Popup>
              {selectedCountry.name}
            </Popup>
          </Marker>
      }
    </MapContainer>
  );
};

export default Map;


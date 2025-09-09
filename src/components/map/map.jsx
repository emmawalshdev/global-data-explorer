
import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {

  const [position, setPosition] = useState([51.505, -0.09]);

  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]

  const ClickMarker = () => {
    useMapEvents({
      click(e){
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    });

    return (
      <Marker position={position}>
        <Popup>
          Marker at position {position[0].toFixed(3)}, {position[1].toFixed(3)}
        </Popup>
      </Marker>
    )
  }


  return (
    <MapContainer bounds={outerBounds} zoom={5} style={{ height: "500px", width: "700px" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ClickMarker/>
    </MapContainer>

  );
};

export default Map;


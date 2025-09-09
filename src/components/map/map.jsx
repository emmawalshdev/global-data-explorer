
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {

  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]


  return (
    <MapContainer bounds={outerBounds} zoom={13} style={{ height: "500px", width: "700px" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A simple popup example.
        </Popup>
      </Marker>
    </MapContainer>

  );
};

export default Map;


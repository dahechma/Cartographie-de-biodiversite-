import React, { useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-search/dist/leaflet-search.min.css';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

import axios from 'axios';

const YourComponent = () => {
  const onCreated = (e) => {
    const { layer } = e;
    // Get polygon coordinates
    const polygonCoordinates = layer.toGeoJSON().geometry.coordinates[0];

    // Send data to the backend using Axios
    axios
      .post('/creer_parcelle/', {
        nom_parcelle: 'Nom de la parcelle', // Replace with the actual name
        coordinates: JSON.stringify(polygonCoordinates),
        exploitation_id: 'ID de l exploitation', // Replace with the actual ID
      })
      .then((response) => {
        console.log('Parcelle enregistrée avec succès!');
      })
      .catch((error) => {
        console.error('Erreur lors de l enregistrement de la parcelle:', error);
      });
  };

  const EditableMap = () => {
    const map = useMap();

    const drawOptions = {
      position: 'topleft',
      draw: {
        polygon: true,
        polyline: true,
        rectangle: false,
        circle: false,
        marker: false,
      },
      edit: {
        featureGroup: map,
        remove: true,
      },
      onCreated,
    };

    useEffect(() => {
      const drawControl = new L.Control.Draw(drawOptions);
      map.addControl(drawControl);

      // Add the search control
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
      });

      map.addControl(searchControl);
    }, [map, drawOptions]);

    return null;
  };

  return (
    <div>
      <header className="bandeau">
        {/* Your header content goes here */}
      </header>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <FeatureGroup>
          <EditableMap />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default YourComponent;

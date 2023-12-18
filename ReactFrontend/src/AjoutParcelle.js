

import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import LeafletGeocoder from './LeafletGeocoder'
import L from "leaflet";
import "./App.css";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Axios from "axios"; // Importez Axios pour effectuer des requêtes HTTP



const convertToGeoJSON = (coordinates) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinates.map(latlng => [latlng.lng, latlng.lat])]
    },
    properties: {
      // Ajoutez d'autres propriétés de la parcelle si nécessaire
    }
  };
};


  function AjoutParcelle() {
    const position = [36.8065, 10.1815];
    const ZOOM_LEVEL = 12;

    const [mapLayers, setMapLayers] = useState([]);

    // Utilisez useRef pour obtenir une référence à la carte
    const mapRef = useRef();
  
    // Définissez la méthode _created pour gérer la création d'un nouveau polygone
    const _created = (e) => {
      const { layerType, layer } = e;
    
      if (layerType === "polygon") {
        const { _leaflet_id } = layer;
    
        // Extraire les coordonnées de LatLng et les stocker dans un format simple
        const coordinates = layer.getLatLngs()[0].map(latlng => ({
          lat: latlng.lat,
          lng: latlng.lng
        }));
    
        // Mettre à jour l'état avec la nouvelle couche (parcelle)
        setMapLayers((prevLayers) => [
          ...prevLayers,
          {  coordinates: coordinates },
        ]);
      }
    };
  
    useEffect(() => {
      // Afficher le contenu de mapLayers à chaque mise à jour
      console.log("Contenu de mapLayers :", mapLayers);
    }, [mapLayers]);


    


    const handleValidation = () => {
      mapLayers.forEach(parcelle => {
        if (parcelle.coordinates && parcelle.coordinates.length >= 3) {
          // Convertir les coordonnées en GeoJSON
          const geoJSONData = convertToGeoJSON(parcelle.coordinates);
  
          // Envoyer les données converties au backend
          Axios.post('http://127.0.0.1:8000/ajout_parcelles/', { parcelle: geoJSONData })
            .then(response => {
              console.log('Parcelle enregistrée avec succès !', response.data);
              // Réinitialiser la couche de la carte après l'enregistrement réussi
              setMapLayers([]);
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement de la parcelle :', error);
            });
        } else {
          console.error('Les données de la parcelle sont incomplètes :', parcelle);
        }
      });
    };
    
    
    
    
    

  return (
    <div className="App">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{
              
            }}
          />
          {mapLayers.map((layer) => (
            <Polygon key={layer.id} positions={layer.coordinates} />
          ))}
        </FeatureGroup>
      </MapContainer>
      <button onClick={handleValidation}>Valider</button>
    </div>
  );
  }
  
  let DefaultIcon = L.icon({
    iconUrl: "data:image/png;base64,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",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

export default AjoutParcelle;


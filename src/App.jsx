import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "./assets/pin.png"; // Import your custom pin image

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView(
      [position.lat, position.lng],
      13
    );

    // Satellite tile layer
    const satelliteLayer = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution:
          'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>',
      }
    ).addTo(mapInstanceRef.current);

    // Custom icon for marker
    const customIcon = L.icon({
      iconUrl: iconUrl, // Path to your custom pin image
      iconSize: [32, 32], // Size of the image
      iconAnchor: [16, 32], // Position of the image relative to the marker's location
    });

    markerRef.current = L.marker([position.lat, position.lng], {
      icon: customIcon,
    }).addTo(mapInstanceRef.current);

    mapInstanceRef.current.on("click", function (e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([position.lat, position.lng], 13);
      markerRef.current.setLatLng([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MapComponent;

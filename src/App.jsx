import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position

  // Fetch the user's location
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

  // Initialize the map once
  useEffect(() => {
    if (mapInstanceRef.current) return; // If map instance already exists, do nothing

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current).setView(
      [position.lat, position.lng],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    // Initialize the marker
    markerRef.current = L.marker([position.lat, position.lng]).addTo(
      mapInstanceRef.current
    );

    // Update position state on map click
    mapInstanceRef.current.on("click", function (e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    // Clean up the map instance on component unmount
    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map and marker position when `position` state changes
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([position.lat, position.lng], 16);
      markerRef.current.setLatLng([position.lat, position.lng]);
    }
  }, [position]);
  console.log(position);
  return (
    <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MapComponent;

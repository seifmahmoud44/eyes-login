import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/pin.png"; // Import your custom pin image

// eslint-disable-next-line react/prop-types
const DashboardMap = ({ setLocation, location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView(
      [location.lat, location.lng],
      18
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
    );

    // Add the satellite layer to the map
    satelliteLayer.addTo(mapInstanceRef.current);

    // Custom icon for marker
    const customIcon = L.icon({
      iconUrl: iconUrl, // Path to your custom pin image
      iconSize: [32, 32], // Size of the image
      iconAnchor: [16, 32], // Position of the image relative to the marker's location
    });

    markerRef.current = L.marker([location.lat, location.lng], {
      icon: customIcon,
    }).addTo(mapInstanceRef.current);

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([location.lat, location.lng], 17);
      markerRef.current.setLatLng([location.lat, location.lng]);
    }
  }, [location]);

  return (
    <div className="h-full w-full">
      <div
        id="map"
        className="relative"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
};

export default DashboardMap;

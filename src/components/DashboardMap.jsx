import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/pin.png"; // Import your custom pin image

const DashboardMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView(
      [21.373802072095938, 39.944572448730476],
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
    );

    // Add the satellite layer to the map
    satelliteLayer.addTo(mapInstanceRef.current);

    // Custom icon for marker
    const customIcon = L.icon({
      iconUrl: iconUrl, // Path to your custom pin image
      iconSize: [32, 32], // Size of the image
      iconAnchor: [16, 32], // Position of the image relative to the marker's location
    });

    // Add markers for each location
    if (location) {
      location.forEach((location) => {
        const marker = L.marker([location.lat, location.lng], {
          icon: customIcon,
        }).addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    }

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      markersRef.current.forEach((marker) =>
        mapInstanceRef.current.removeLayer(marker)
      );
      markersRef.current = [];

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      if (location) {
        location.forEach((location) => {
          const marker = L.marker([location.lat, location.lng], {
            icon: customIcon,
          }).addTo(mapInstanceRef.current);
          markersRef.current.push(marker);
        });

        if (location.length > 0) {
          const bounds = L.latLngBounds(
            location.map((loc) => [loc.lat, loc.lng])
          );
          mapInstanceRef.current.fitBounds(bounds);
        }
      }
    }
  }, [location]);

  return (
    <div className="h-full w-full watermark">
      <div
        id="map"
        className="relative"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      ></div>

      <div className="hide_watermark"></div>
    </div>
  );
};

export default DashboardMap;

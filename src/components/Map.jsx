import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/pin.png"; // Import your custom pin image
import ChooseTypeModel from "./ChooseTypeModel";

// eslint-disable-next-line react/prop-types
const MapComponent = ({ setLocation, location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(location); // Default position

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
      17
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

    markerRef.current = L.marker([position.lat, position.lng], {
      icon: customIcon,
    }).addTo(mapInstanceRef.current);

    mapInstanceRef.current.on("click", function (e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([position.lat, position.lng], 17);
      markerRef.current.setLatLng([position.lat, position.lng]);
    }
  }, [position]);
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="h-screen w-screen">
      {showModel && (
        <ChooseTypeModel setShowModel={setShowModel} position={position} />
      )}
      <div
        id="map"
        className="relative"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      ></div>
      <div className="z-[1000]  py-3 absolute bottom-0 left-0 w-full bg-black bg-opacity-15 flex justify-center items-center ">
        <button
          onClick={() => setShowModel(true)}
          className="font-bold text-2xl  max-w-full px-6 py-3 bg-[#1A6537] text-white rounded z-[1001] "
        >
          تاكيد
        </button>
      </div>
    </div>
  );
};

export default MapComponent;

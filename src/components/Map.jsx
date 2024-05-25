import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/pin.png"; // Import your custom pin image
import ChooseTypeModel from "./ChooseTypeModel";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MapComponent = ({ setLocation, location }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(location); // Default position
  const [showMarker, setShowMarker] = useState(true); // State to control marker visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude || 21.373802072095938,
            lng: position.coords.longitude || 39.944572448730476,
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
    });

    mapInstanceRef.current.on("click", function (e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      setShowMarker(true); // Show marker when location is set
    });

    return () => {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([position.lat, position.lng]);
      if (showMarker) {
        markerRef.current
          .setLatLng([position.lat, position.lng])
          .addTo(mapInstanceRef.current);
      } else {
        markerRef.current.remove();
      }
    }
  }, [position, showMarker]);

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
      >
        <div className="hide_watermark"></div>
      </div>
      <div className="z-[999999]  py-3 absolute bottom-0 left-0 w-full bg-black bg-opacity-15 flex justify-center items-center ">
        <button
          disabled={!showMarker}
          onClick={() => setShowModel(true)}
          className="cursor-pointer disabled:bg-black disabled:bg-opacity-30 font-bold text-2xl  max-w-full px-6 py-3 bg-[#1A6537] text-white rounded z-[1001] "
        >
          تأكيد الموقع
        </button>

        {Cookies.get("user_client") !== undefined && (
          <IoIosLogOut
            onClick={() => {
              Cookies.remove("user_client");
              Cookies.remove("email_client");
              navigate("/", { replace: true });
            }}
            className="mr-3 font-bold text-4xl p-2 bg-[#1A6537] text-white rounded cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default MapComponent;

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/pin.png"; // Import your custom pin image

// eslint-disable-next-line react/prop-types
const DashboardMap = ({ location, mapZoom }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const controlMessageRef = useRef(null);
  const [zoomProps, setZoom] = useState(13);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      scrollWheelZoom: false, // Disable default scroll wheel zoom
    }).setView([21.373802072095938, 39.944572448730476], 13);

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
      // eslint-disable-next-line react/prop-types
      location.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: customIcon,
        }).addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    }

    // Custom scroll zoom behavior
    if (!mapRef.current) return; // تحقق من أن mapRef.current ليست null

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        mapInstanceRef.current.scrollWheelZoom.enable();
      } else {
        mapInstanceRef.current.scrollWheelZoom.disable();
        if (controlMessageRef.current) {
          controlMessageRef.current.style.display = "block";
          setTimeout(() => {
            if (controlMessageRef.current) {
              controlMessageRef.current.style.display = "none";
            }
          }, 2000);
        }
      }
    };

    mapRef.current.addEventListener("wheel", handleWheel);

    return () => {
      if (mapRef.current && mapInstanceRef.current) {
        // تحقق من أن mapRef.current و mapInstanceRef.current ليست null
        mapRef.current.removeEventListener("wheel", handleWheel);
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapZoom) {
      const mapZoomN = parseInt(mapZoom, 10);
      setZoom(mapZoomN);
    }

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
        location.forEach((loc) => {
          const marker = L.marker([loc.lat, loc.lng], {
            icon: customIcon,
          }).addTo(mapInstanceRef.current);
          markersRef.current.push(marker);
        });

        if (location.length > 0) {
          const bounds = L.latLngBounds(
            location.map((loc) => [loc.lat, loc.lng])
          );
          mapInstanceRef.current.fitBounds(bounds, {
            maxZoom: zoomProps,
          });
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
      <div
        ref={controlMessageRef}
        style={{
          display: "none",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        استخدم زر Ctrl مع عجلة الماوس للتكبير أو التصغير
      </div>
      <div className="hide_watermark"></div>
    </div>
  );
};

export default DashboardMap;

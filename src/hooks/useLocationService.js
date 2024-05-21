import { useState, useEffect } from "react";

const useLocationService = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    const checkLocationStatus = () => {
      if ("geolocation" in navigator) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            setIsLocationEnabled(true);
          } else if (result.state === "prompt") {
            // Location permission has not been granted or denied yet, ask the user
            const handlePermissionChange = () => {
              if (this.state === "granted") {
                setIsLocationEnabled(true);
              } else {
                setIsLocationEnabled(false);
              }
              result.removeEventListener("change", handlePermissionChange);
            };

            result.addEventListener("change", handlePermissionChange);
          }
        });
      } else {
        // Geolocation is not supported by this browser
        console.log("Geolocation is not supported by this browser.");
      }
    };

    checkLocationStatus();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  return isLocationEnabled;
};

export default useLocationService;

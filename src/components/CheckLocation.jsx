import { useEffect } from "react";
import location from "../assets/circle.png";
const CheckLocation = () => {
  useEffect(() => {
    const askForLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Latitude:", position.coords.latitude);
            console.log("Longitude:", position.coords.longitude);
          },
          (err) => {
            console.error("Error:", err.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    };
    askForLocation();
  }, []);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-10 flex flex-col justify-center items-center gap-6">
      <img src={location} alt="" className="w-[100px]" />
      <h1 className="font-bold text-2xl">نرجو تشغيل خدمات الموقع</h1>
    </div>
  );
};

export default CheckLocation;

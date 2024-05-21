import { useEffect, useState } from "react";
import Map from "./components/Map";
import Intro from "./components/Intro";
import { gsap } from "gsap";
import CheckLocation from "./components/CheckLocation";
import useLocationService from "./hooks/useLocationService";

const App = () => {
  const [location, setLocation] = useState({
    lat: 31.00015556438264,
    lng: 29.74384188652039,
  });
  const [clearIntro, setClearIntro] = useState(false);
  const checkLocation = useLocationService();

  useEffect(() => {
    const loadHandler = () => {
      setTimeout(() => {
        gsap.to(".intro", {
          y: "-100%",
          ease: "power2.in",
          onComplete: () => {
            setClearIntro(true);
          },
        });
      }, 2000);
    };

    window.addEventListener("load", loadHandler);

    return () => {
      window.removeEventListener("load", loadHandler);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {!clearIntro && (
        <div className="intro relative z-20">
          <Intro />
        </div>
      )}
      {!checkLocation ? (
        <CheckLocation />
      ) : (
        clearIntro && <Map location={location} setLocation={setLocation} />
      )}
    </div>
  );
};

export default App;

import { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [location, setLocation] = useState({
    lat: 31.00015556438264,
    lng: 29.74384188652039,
  });
  console.log(location);
  return (
    <div>
      <Map location={location} setLocation={setLocation} />
    </div>
  );
};

export default App;

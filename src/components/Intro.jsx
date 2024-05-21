import { BeatLoader } from "react-spinners";
import logo from "../assets/logo.webp";

const Intro = () => {
  return (
    <div className="text-center flex justify-center items-center flex-col h-screen bg-[#E8EDEA]">
      <img src={logo} alt="" className="max-w-[500px] w-screen" />
      <BeatLoader color="#1A6537" />
    </div>
  );
};

export default Intro;

import { BeatLoader } from "react-spinners";
import logo from "../assets/logo.png";

const Intro = () => {
  return (
    <div className="text-center gap-4 flex justify-center items-center flex-col h-screen bg-[#E8EDEA]">
      <img src={logo} alt="" className="max-w-[280px] w-screen" />
      <BeatLoader color="#1A6537" />
    </div>
  );
};

export default Intro;

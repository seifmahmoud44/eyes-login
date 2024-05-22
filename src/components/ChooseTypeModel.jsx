import { gsap } from "gsap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import closeImg from "../assets/close.png";
// eslint-disable-next-line react/prop-types
const ChooseTypeModel = ({ setShowModel, position }) => {
  useEffect(() => {
    gsap.fromTo(".model", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 });
  }, []);
  const navigate = useNavigate();

  return (
    <div className=" absolute z-[1001] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="relative model flex flex-col justify-center items-center gap-6 bg-white p-10 rounded-md">
        <div
          onClick={() => setShowModel(false)}
          className="p-2 cursor-pointer rounded bg-[#1A6537] absolute top-1 left-1 w-6 z-[1002] flex justify-center items-center "
        >
          <img src={closeImg} alt="" className="" />
        </div>

        <button
          onClick={() => navigate("/request/0", { state: { position } })}
          className="font-bold text-lg text-nowrap w-fit px-6 py-3 bg-[#1A6537] text-white rounded"
        >
          بلاغات المراقب الميداني
        </button>
        <button
          onClick={() => navigate("/request/1", { state: { position } })}
          className="font-bold text-lg text-nowrap w-fit px-6 py-3 bg-[#1A6537] text-white rounded"
        >
          بلاغات مقدمي الخدمة
        </button>
      </div>
    </div>
  );
};

export default ChooseTypeModel;

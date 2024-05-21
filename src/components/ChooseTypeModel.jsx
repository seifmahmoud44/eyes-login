import { gsap } from "gsap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChooseTypeModel = () => {
  useEffect(() => {
    gsap.fromTo(".model", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 });
  }, []);
  const navigate = useNavigate();
  return (
    <div className=" absolute z-[1001] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="model flex flex-col justify-center items-center gap-6 bg-white p-10 rounded-md">
        <button
          onClick={() => navigate("/supervisor")}
          className="font-bold text-lg text-nowrap w-fit px-6 py-3 bg-[#1A6537] text-white rounded"
        >
          بلاغات المراقب الميداني
        </button>
        <button className="font-bold text-xl text-nowrap w-fit px-6 py-3 bg-[#1A6537] text-white rounded">
          بلاغات مقدمي الخدمة
        </button>
      </div>
    </div>
  );
};

export default ChooseTypeModel;

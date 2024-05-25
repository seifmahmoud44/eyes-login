import { useEffect } from "react";
import confirmImg from "../assets/check-mark.png";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
const Sucsess = () => {
  useEffect(() => {
    gsap.fromTo(
      ".img",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: "bounce.out" }
    );
  }, []);
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-[#1A6537] text-2xl">تم ارسال بلاغك</h1>
      <img className="img w-[200px]" src={confirmImg} alt="" />
      <button
        onClick={() => navigate("/login")}
        className="bg-[#1A6537] px-4 py-2 text-white flex justify-center items-center rounded cursor-pointer"
      >
        اضافة بلاغ جديد
      </button>
    </div>
  );
};

export default Sucsess;

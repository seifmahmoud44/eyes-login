import location from "../assets/circle.png";
const CheckLocation = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-10 flex flex-col justify-center items-center gap-6">
      <img src={location} alt="" className="w-[100px]" />
      <h1 className="font-bold text-2xl">نرجو تشغيل خدمات الموقع</h1>
    </div>
  );
};

export default CheckLocation;

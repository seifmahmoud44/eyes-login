import { useState } from "react";
import DashboardMap from "../components/DashboardMap";
import DashTable from "../components/DashTable";

const DashboardReview = () => {
  const [location, setLocation] = useState({
    lat: 21.4146051,
    lng: 39.894564,
  });
  const [stats, setStats] = useState("");
  return (
    <div className="grid grid-con grid-cols-2 grid-rows-3 h-screen gap-2 bg-slate-300">
      {/* map */}
      <div className="bg-gray-200  max-md:w-full max-md:h-[400px] max-sm:min-h-[300px]">
        <DashboardMap location={location} />
      </div>
      {/* stats */}

      <div className="   max-md:w-full text-center h-full max-md:h-fit flex flex-col gap-2">
        <h1 className="py-4 bg-white font-bold text-xl">
          مؤشرات بلاغات عين المشاعر المقدسة
        </h1>
        <div className="flex justify-center items-center h-full  gap-2">
          <div className="text-center flex flex-col justify-center items-center w-full  h-full bg-white space-y-4 py-4">
            <h3 className="font-bold text-lg">مجموع بلاغات الرفع الميداني</h3>
            <p className="font-bold text-4xl">{stats ? stats : "-"}</p>
          </div>
          <div className="text-center flex flex-col justify-center items-center w-full h-full  space-y-4 py-4 bg-white ">
            <h3 className="font-bold text-lg">مجموع بلاغات مقدمي الخدمة</h3>
            <p className="font-bold text-4xl">{stats ? stats : "-"}</p>
          </div>
        </div>
      </div>
      {/* table */}

      <div className="table-con   max-md:w-full bg-green-400 col-span-2 row-span-2 ">
        <DashTable setLocation={setLocation} setStats={setStats} />
      </div>
    </div>
  );
};

export default DashboardReview;

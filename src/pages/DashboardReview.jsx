import { useState } from "react";
import DashboardMap from "../components/DashboardMap";
import DashTable from "../components/DashTable";

const DashboardReview = () => {
  const [location, setLocation] = useState();

  const [stats, setStats] = useState({
    total_items1: "",
    total_items2: "",
  });
  console.log(stats);
  return (
    <div className="flex flex-col  gap-2 bg-slate-300">
      {/* map */}
      <div className="   max-md:w-full text-center h-full max-md:h-fit flex flex-col gap-2">
        <h1 className="py-4 bg-white font-bold text-xl">
          مؤشرات بلاغات عين المشاعر المقدسة
        </h1>
        <div className="flex justify-center items-center flex-col h-full  gap-2">
          <div className="flex justify-center items-center gap-2 w-full max-md:flex-col ">
            <div className="text-white text-center flex flex-col justify-center items-center w-full  h-full bg-gradient-to-br from-orange-500 to-orange-300 space-y-4 py-4">
              <h3 className="font-bold text-lg">
                اجمالي بلاغات المراقب الميداني
              </h3>
              <p className="font-bold text-4xl">
                {stats.total_items1 ? stats.total_items1 : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-cyan-300 text-white text-center flex flex-col justify-center items-center w-full h-full  space-y-4 py-4 ">
              <h3 className="font-bold text-lg">اجمالي بلاغات مقدمي الخدمة</h3>
              <p className="font-bold text-4xl">
                {stats.total_items2 ? stats.total_items2 : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-300 text-white text-center flex flex-col justify-center items-center w-full  h-full bg-white space-y-4 py-4">
              <h3 className="font-bold text-lg">اجمالي عدد بلاغات</h3>
              <p className="font-bold text-4xl">
                {+stats.total_items1 + +stats.total_items2}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 w-full max-md:flex-col ">
            <div className="bg-gradient-to-br from-fuchsia-500 to-purple-300 text-white text-center flex flex-col justify-center items-center w-full  h-full bg-white space-y-4 py-4">
              <h3 className="font-bold text-lg">حالة البلاغ</h3>
              <p className="font-bold text-4xl">
                {stats.total_items1 ? stats.total_items1 : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-600 to-rose-400 text-white text-center flex flex-col justify-center items-center w-full h-full  space-y-4 py-4 bg-white ">
              <h3 className="font-bold text-lg">تصنيف البلاغ</h3>
              <p className="font-bold text-4xl">
                {stats.total_items2 ? stats.total_items2 : "0"}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-300 text-white text-center flex flex-col justify-center items-center w-full  h-full bg-white space-y-4 py-4">
              <h3 className="font-bold text-lg">نوع البلاغ</h3>
              <p className="font-bold text-4xl">
                {stats.total_items1 ? stats.total_items1 : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200  w-full h-[300px]">
        <DashboardMap location={location} />
      </div>
      {/* stats */}

      {/* table */}

      <div className="table-con   max-md:w-full bg-green-400 col-span-2 row-span-2 ">
        <DashTable setLocation={setLocation} setStats={setStats} />
      </div>
    </div>
  );
};

export default DashboardReview;

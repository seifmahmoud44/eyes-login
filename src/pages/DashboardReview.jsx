import { useState } from "react";
import DashboardMap from "../components/DashboardMap";
import DashTable from "../components/DashTable";
import sittingsImg from "../assets/setting.png";
import PasswordModel from "../components/PasswordModel";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { TbReportAnalytics } from "react-icons/tb";

const DashboardReview = ({ veiw }) => {
  const [location, setLocation] = useState();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_items1: "",
    total_items2: "",
  });
  const [passwordModel, setPasswordModel] = useState(false);
  return (
    <div className="flex flex-col  gap-2 bg-slate-300">
      {passwordModel && <PasswordModel setPasswordModel={setPasswordModel} />}
      {/* map */}
      <div className="max-md:w-full text-center h-full max-md:h-fit flex flex-col gap-2">
        <div className="px-6 flex justify-between items-center gap-5 py-4 bg-white">
          <h1 className=" font-bold text-[12px] lg:text-[30px]">
            مؤشرات بلاغات عين المشاعر المقدسة
          </h1>

          {veiw && (
            <div className="flex justify-center items-center gap-3">
              <img
                onClick={() => setPasswordModel(true)}
                src={sittingsImg}
                alt=""
                className="w-8 cursor-pointer"
              />

              <IoIosLogOut
                onClick={() => {
                  Cookies.remove("user_client");
                  Cookies.remove("email_client");
                  navigate("/", { replace: true });
                }}
                className="max-w-fit font-bold text-[16px] lg:text-[30px] text-[#111] rounded cursor-pointer"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center flex-col h-full  gap-2">
          <div className="flex justify-center items-center gap-2 w-full max-md:flex-col ">
            <div className=" text-white flex p-8 justify-between w-full h-full bg-gradient-to-br from-[#2240ff] to-[#a9d9dc] ">
              <div>
                <h3 className="font-bold text-[12px] lg:text-[20px]">
                  إجمالي عدد بلاغات المراقب الميداني
                </h3>
                <p className="font-bold text-4xl max-w-fit">
                  {stats.total_items1 ? stats.total_items1 : "0"}
                </p>
              </div>

              <TbReportAnalytics className="text-4xl" />
            </div>

            <div className=" text-white flex p-8 justify-between w-full h-full bg-gradient-to-br from-[#2240ff] to-[#a9d9dc] ">
              <div>
                <h3 className="font-bold text-[12px] lg:text-[20px]">
                  إجمالي عدد بلاغات مقدمي الخدمة
                </h3>
                <p className="font-bold text-4xl max-w-fit">
                  {stats.total_items2 ? stats.total_items2 : "0"}
                </p>
              </div>
              <TbReportAnalytics className="text-4xl" />
            </div>

            <div className=" text-white flex p-8 justify-between w-full h-full bg-gradient-to-br from-[#2240ff] to-[#a9d9dc] ">
              <div>
                <h3 className="font-bold text-[12px] lg:text-[20px]">
                  إجمالي عدد البلاغات
                </h3>
                <p className="font-bold text-4xl max-w-fit">
                  {+stats.total_items1 + +stats.total_items2 || 0}
                </p>
              </div>
              <TbReportAnalytics className="text-4xl" />
            </div>
          </div>

          {/* <div className="flex justify-center items-center gap-2 w-full max-md:flex-col ">
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
          </div> */}
        </div>
      </div>
      <div className="bg-gray-200  w-full h-[90vh]">
        <DashboardMap location={location} />
      </div>
      {/* stats */}

      {/* table */}

      <div className="table-con   max-md:w-full bg-green-400 col-span-2 row-span-2 ">
        <DashTable veiw={veiw} setLocation={setLocation} setStats={setStats} />
      </div>
    </div>
  );
};

export default DashboardReview;

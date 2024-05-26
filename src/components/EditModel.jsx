/* eslint-disable react/prop-types */
import { useState } from "react";
import closeImg from "../assets/close-black.png";

import useAxiosUpdate from "../hooks/useAxiosUpdate";
import DashboardMap from "./DashboardMap";
import { convertToNormalObject } from "../utility/objCnverter";
import { toast } from "sonner";
// eslint-disable-next-line react/prop-types
const EditModel = ({ setEditModel, data, veiw }) => {
  //   const [contactNumber, setContactNumber] = useState(data.contact_number);
  //   const [registrationNumber, setRegistrationNumber] = useState(
  //     data.registration_number
  //   );
  //   const [reportCategory, setReportCategory] = useState(data.report_category);
  const [reportStatus, setReportStatus] = useState(data?.report_status);
  //   const [userManagement, setUserManagement] = useState(data.user_management);
  //   const [userName, setUserName] = useState(data.user_name);
  const [reportingParty, setReportingParty] = useState(data?.reporting_party);
  const repoCatObj = {
    1: "البنى التحتية",
    2: "الجاهزية",
    3: "الاعاشة",
    4: "التشغيل والصيانة",
    5: "اخرى",
  };

  const { sendData } = useAxiosUpdate();
  const submitHandler = (e) => {
    e.preventDefault();
    // const data = {
    //     contact_number: contactNumber,
    //     registration_number: registrationNumber,
    //     report_category: reportCategory,
    //     report_status: reportStatus,
    //     user_management: userManagement,
    //     user_name: userName

    // }
    const updatedData = {
      id: data.id,
      report_status: reportStatus,
      reporting_party: reportingParty,
    };

    sendData(
      "https://eye-almashaeir.com/backend/update/reporter.php?api=311958357932035780279254406072",
      updatedData
    ).then((e) => {
      e.request === "successfully" && toast.info("تم التعديل");
      setEditModel(false);
    });
  };

  return (
    <div className="fixed overflow-auto top-0 left-0 h-full w-screen bg-[#ccc] p-8 z-[2000] flex justify-center items-start">
      <div className=" relative  w-[500px] bg-white rounded-md p-7">
        <img
          onClick={() => setEditModel(false)}
          className="w-6 absolute left-4 top-4 cursor-pointer hover:scale-110 transition-all"
          src={closeImg}
          alt=""
        />
        <div className="w-full h-[300px] mt-6">
          <DashboardMap
            location={[convertToNormalObject(data.location_map)]}
            mapZoom="18"
          />
        </div>
        <div>
          {data.file_type === "1" ? (
            <img
              className="w-full"
              src={`https://eye-almashaeir.com/backend/${data.file_link}` || ""}
              alt=""
            />
          ) : data.file_type === "2" ? (
            <video
              className="w-full"
              src={`https://eye-almashaeir.com/backend/${data.file_link}` || ""}
              controls
            ></video>
          ) : (
            <audio
              className="w-full"
              src={`https://eye-almashaeir.com/backend/${data.file_link}` || ""}
              controls
            ></audio>
          )}
        </div>
        <form action="" onSubmit={submitHandler} className="space-y-3">
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              {data.type_report === "1" ? "اسم المراقب:" : "اسم مقدم البلاغ:"}
            </label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              // onChange={(e) => setUserName(e.target.value)}
              // // eslint-disable-next-line react/prop-types
              value={data.user_name || ""}
              type="text"
              required
              disabled
            />
          </div>
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              {data.type_report === "1"
                ? "الإدارة التابع لها:"
                : "مكتب تقديم الخدمة:"}
            </label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="text"
              required
              disabled
              // onChange={(e) => setUserManagement(e.target.value)}
              // eslint-disable-next-line react/prop-types
              value={data.user_management || ""}
            />
          </div>
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              رقم الشاخص:
            </label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="text"
              required
              disabled
              // onChange={(e) => setRegistrationNumber(e.target.value)}
              // eslint-disable-next-line react/prop-types
              value={data.registration_number || ""}
            />
          </div>
          <div className="w-full">
            <label className="block" htmlFor="category">
              تصنيف البلاغ:
            </label>
            <select
              value={repoCatObj[data.report_category]}
              // onChange={(e) => setReportCategory(e.target.value)}
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              required
              disabled
            >
              <option value="1">البنية التحتية</option>
              <option value="2">الجاهزية</option>
              <option value="3">الاعاشة</option>
              <option value="4">التشغيل والصيانة</option>
              <option value="5">اخري</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              رقم التواصل:
            </label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="text"
              required
              disabled
              // onChange={(e) => setContactNumber(e.target.value)}
              // eslint-disable-next-line react/prop-types
              value={data.contact_number || ""}
            />
          </div>

          {veiw && (
            <div className="w-full">
              <label className="block" htmlFor="registration_number">
                البريد الإلكتروني لمقدم البلاغ:
              </label>
              <input
                className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
                type="text"
                required
                disabled
                // onChange={(e) => setContactNumber(e.target.value)}
                // eslint-disable-next-line react/prop-types
                value={data.email_client || ""}
              />
            </div>
          )}
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              تاريخ استلام البلاغ:
            </label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="text"
              disabled
              // onChange={(e) => setContactNumber(e.target.value)}
              // eslint-disable-next-line react/prop-types
              value={data.date_add || ""}
            />
          </div>
          <div className="w-full">
            <label htmlFor="inputFilter" className="block">
              حالة البلاغ:
            </label>
            <select
              // eslint-disable-next-line react/prop-types
              value={reportStatus}
              onChange={(e) => setReportStatus(e.target.value)}
              id="inputFilter"
              disabled={!veiw}
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            >
              <option value="1">بلاغ جديد</option>
              <option value="2">تحت المراجعة</option>
              <option value="3">تم المباشرة</option>
              <option value="4">تم حل البلاغ</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block" htmlFor="registration_number">
              الجهة المعينة بمباشرة البلاغ:
            </label>
            {veiw ? (
              <textarea
                rows={3}
                className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
                type="text"
                onChange={(e) => setReportingParty(e.target.value)}
                // eslint-disable-next-line react/prop-types
                value={reportingParty || ""}
                placeholder="مطلوب"
              />
            ) : (
              <p>{reportingParty || "لا توجد بيانات"}</p>
            )}
          </div>

          {veiw && (
            <button
              type="submit"
              className="bg-yellow-300 px-4 py-2 my-2 mx-auto block rounded text-black"
            >
              تعديل
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditModel;

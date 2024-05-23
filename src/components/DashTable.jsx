import openImg from "../assets/open.png";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import submitImg from "../assets/check.png";
import { useEffect, useState } from "react";
import useAxiosGet from "../hooks/useAxiosGet";
import EditModel from "./EditModel";
import { convertToNormalObject } from "../utility/objCnverter";
import useAxiosDelete from "../hooks/useAxiosDelete";
import { Toaster, toast } from "sonner";

const DashTable = ({ setLocation, setStats }) => {
  const [pageNumber, setPageNumber] = useState("1");
  const [reportCategory, setReportCategory] = useState("");
  const [typeReport, setTypeReport] = useState("1");
  const [reportStatus, setReportStatus] = useState("");
  const [editMood, setEditMood] = useState(false);
  const [selected, setSelected] = useState("");

  const url = `https://eye-almashaeir.com/backend/read/reporter.php?api=311958357932035780279254406072&page=${pageNumber}&report_category=${reportCategory}&type_report=${typeReport}&report_status=${reportStatus}`;

  const repoCatObj = {
    1: "البنى التحتية",
    2: "الجاهزية",
    3: "الإعاشة",
    4: "التشغيل والصيانة",
    5: "أخرى",
  };

  const repoStatusObj = {
    1: "بلاغ جديد",
    2: "تحت المعالجة",
    3: "تم المباشرة",
    4: "تم حل البلاغ",
  };

  const { data, fetchData } = useAxiosGet();
  const { deleteData } = useAxiosDelete();

  useEffect(() => {
    fetchData(url).then((e) => {
      setStats({
        total_items1: e.total_items1,
        total_items2: e.total_items2,
      });
      if (e.data) {
        const allLocations = e.data.map((item) =>
          convertToNormalObject(item.location_map)
        );
        setLocation(allLocations);
      }
    });
  }, [fetchData, url, editMood]);

  const deleteUrl = `https://eye-almashaeir.com/backend/delete/reporter.php?api=311958357932035780279254406072`;

  return (
    <div className="overflow-x-auto bg-white h-full overflow-y-scroll flex flex-col">
      <Toaster position="bottom-left" richColors />
      {editMood && (
        <EditModel
          data={selected}
          editModel={editMood}
          setEditModel={setEditMood}
        />
      )}
      <div className="relative m-[2px] my-3 mx-3 flex justify-start items-center gap-3">
        <label htmlFor="inputFilter">نوع البلاغ</label>
        <select
          onChange={(e) => setTypeReport(e.target.value)}
          value={typeReport}
          id="inputFilter"
          className="block w-40 rounded-lg border dark:border-none dark:bg-slate-200 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="1">بلاغات المراقب الميداني</option>
          <option value="2">بلاغات مقدمي الخدمة</option>
        </select>
        <label htmlFor="inputFilter1">حالة البلاغ</label>
        <select
          value={reportStatus}
          onChange={(e) => setReportStatus(e.target.value)}
          id="inputFilter1"
          className="block w-40 rounded-lg border dark:border-none dark:bg-slate-200 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">الكل</option>
          <option value="1">بلاغ جديد</option>
          <option value="2">تحت المراجعة</option>
          <option value="3">تم المباشرة</option>
          <option value="4">تم حل البلاغ</option>
        </select>
        <label htmlFor="inputFilter2">تصنيف البلاغ</label>
        <select
          value={reportCategory}
          onChange={(e) => setReportCategory(e.target.value)}
          id="inputFilter2"
          className="block w-40 rounded-lg border dark:border-none dark:bg-slate-200 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">الكل</option>
          <option value="1">البنية التحتية</option>
          <option value="2">الجاهزية</option>
          <option value="3">الإعاشة</option>
          <option value="4">التشغيل والصيانة</option>
          <option value="5">أخرى</option>
        </select>
      </div>

      <table className="min-w-full text-xs whitespace-nowrap text-center px-3">
        <thead className="uppercase tracking-wider sticky top-0 bg-white outline outline-2 outline-neutral-200 dark:outline-neutral-200 dark:bg-gray-200">
          <tr className="px-3">
            <th className="py-4 text-sm">اسم المراقب</th>
            <th className="py-4 text-sm">الادارة التابع لها</th>
            <th className="py-4 text-sm">رقم الشاخص</th>
            <th className="py-4 text-sm">تصنيف البلاغ</th>
            <th className="py-4 text-sm">وصف البلاغ</th>
            <th className="py-4 text-sm">رقم التواصل</th>
            <th className="py-4 text-sm">تاريخ استلام البلاغ</th>
            <th className="py-4 text-sm">حالة البلاغ</th>
            <th className="py-4 text-sm">الجهة المعنية بمباشرة البلاغ</th>
            <th className="py-4 "></th>
          </tr>
        </thead>
        <tbody>
          {data?.data &&
            data !== null &&
            data.data.map((ele) => {
              return (
                <tr key={ele.id} className="border-b text-center">
                  <td className="py-4 text-center">{ele.user_name}</td>
                  <td className="py-4">{ele.user_management}</td>
                  <td className="py-4">{ele.registration_number}</td>
                  <td className="py-4">{repoCatObj[ele.report_category]}</td>
                  <td className="py-4">{ele.report_description}</td>
                  <td className="py-4">{ele.contact_number}</td>
                  <td className="py-4">{ele.date_add}</td>
                  <td className="py-4">{repoStatusObj[ele.report_status]}</td>
                  <td className="py-4">{ele?.reporting_party || "مطلوب"}</td>
                  <td className="py-4 px-4 flex justify-center items-center gap-5 w-[200px]">
                    <img
                      className="w-6 cursor-pointer hover:scale-110 transition-all"
                      src={openImg}
                      alt=""
                      onClick={() => {
                        const singleLocation = convertToNormalObject(
                          ele.location_map
                        );
                        setLocation([singleLocation]);
                      }}
                    />
                    <img
                      className="w-6 cursor-pointer hover:scale-110 transition-all"
                      src={editImg}
                      alt=""
                      onClick={() => {
                        setSelected(ele);
                        setEditMood(true);
                      }}
                    />
                    <img
                      className="w-6 cursor-pointer hover:scale-110 transition-all"
                      src={deleteImg}
                      alt=""
                      onClick={() =>
                        deleteData(deleteUrl, ele.id).then(() => {
                          fetchData(url);
                          toast.error("تم الحذف");
                        })
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ul className="list-style-none flex gap-5 p-3 sticky bottom-0">
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:bg-gray-500 dark:text-white">
            السابق
          </button>
        </li>
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-black dark:hover:bg-gray-300">
            1
          </button>
        </li>
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:bg-gray-500 dark:text-white">
            التالي
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashTable;

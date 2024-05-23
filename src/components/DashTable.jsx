import openImg from "../assets/open.png";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import submitImg from "../assets/check.png";
const DashTable = () => {
  return (
    <div className="overflow-x-auto bg-white h-full overflow-y-scroll flex flex-col">
      <div className="relative m-[2px] my-3 mx-3 flex justify-start items-center gap-3">
        <label htmlFor="inputFilter" className="">
          حالة البلاغ
        </label>
        <select
          id="inputFilter"
          className="block w-40 rounded-lg border dark:border-none dark:bg-slate-200 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="5">الكل</option>
          <option value="2">تحت المراجعة</option>
          <option value="3">تم المباشرة</option>
          <option value="4">تم حل البلاغ</option>
        </select>
        <label htmlFor="inputFilter2" className="">
          تصنيف البلاغ
        </label>
        <select
          id="inputFilter2"
          className="block w-40 rounded-lg border dark:border-none dark:bg-slate-200 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="5">الكل</option>
          <option value="2">البنية التحتية</option>
          <option value="3">التشغيل والصيانة</option>
          <option value="4">الجهزية</option>
          <option value="4">الاعاشة</option>
          <option value="4">اخرى</option>
        </select>
      </div>

      <table className="min-w-full  text-xs whitespace-nowrap text-center px-3">
        <thead className="uppercase tracking-wider sticky top-0 bg-white  outline outline-2 outline-neutral-200 dark:outline-neutral-200  dark:bg-gray-200">
          <tr className="px-3">
            <th className=" py-4 text-sm">اسم المراقب</th>
            <th className=" py-4 text-sm">الادارة التابع لها</th>
            <th className=" py-4 text-sm">رقم الشاخص</th>
            <th className=" py-4 text-sm">تصنيف البلاغ</th>
            <th className=" py-4 text-sm">وصف البلاغ</th>
            <th className=" py-4 text-sm">رقم التواصل</th>
            <th className=" py-4 text-sm">تاريخ استلام البلاغ</th>
            <th className=" py-4 text-sm">حالة البلاغ</th>
            <th className=" py-4 text-sm">الجهة المعينة بمباشرة البلاغ</th>
            <th className=" py-4 "></th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b text-center">
            <td className=" py-4 text-center">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:border-none p-1 border"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <input
                type="text"
                value={"اسم المراقب"}
                disabled
                className="disabled:bg-gray-200 p-1"
              />
            </td>
            <td className=" py-4">
              <select name="" id="">
                <option selected value="">
                  بلاغ جديد
                </option>
                <option value="">تحت المراجعة</option>
                <option value="">تم المباشرة</option>
                <option value="">تم حل البلاغ</option>
              </select>
            </td>
            <td className="py-4 px-4 flex justify-center items-center gap-5 w-[200px]">
              <img
                className="w-6 cursor-pointer hover:scale-110 transition-all"
                src={openImg}
                alt=""
              />
              <img
                className="w-6 cursor-pointer hover:scale-110 transition-all"
                src={submitImg}
                alt=""
              />
              <img
                className="w-6 cursor-pointer hover:scale-110 transition-all"
                src={editImg}
                alt=""
              />
              <img
                className="w-6 cursor-pointer hover:scale-110 transition-all"
                src={deleteImg}
                alt=""
              />
            </td>
          </tr>
        </tbody>
      </table>

      <ul className="list-style-none flex gap-5 p-3 sticky bottom-0">
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:bg-gray-500 dark:text-white  ">
            السابق
          </button>
        </li>
        <li>
          <button className=" relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300  dark:text-black  dark:hover:bg-gray-300 ">
            1
          </button>
        </li>
        <li>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 dark:bg-gray-500 dark:text-white  ">
            التالي
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashTable;

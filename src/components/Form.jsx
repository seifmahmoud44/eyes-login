import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import CameraCapture from "./CameraCapture";
import captureImg from "../assets/capture.png";

import closeImg from "../assets/close.png";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const Form = () => {
  const [uploadFile, setUploadFile] = useState("");
  const [camModel, setCamModel] = useState(false);

  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!uploadFile) {
      toast.error("يجب رفع فيديو او صورة");
    } else {
      const finalData = { ...data, file_link: uploadFile };
      console.log(finalData);
    }
  };
  //   console.log(uploadFile);
  return (
    <div className="flex justify-center items-center">
      <Toaster richColors position="bottom-center" />
      {camModel && (
        <div className="absolute top-0 left-0 w-full h-full">
          <CameraCapture
            setUploadFile={setUploadFile}
            setCamModel={setCamModel}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-2 py-10 w-[400px] max-md:w-full px-5"
      >
        {uploadFile ? (
          <div className="flex justify-center items-center gap-7">
            <p>{uploadFile.name}</p>
            <div
              onClick={() => {
                setUploadFile("");
              }}
              className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
            >
              <img className="w-2" src={closeImg} alt="" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6">
            <FileUpload setUploadFile={setUploadFile} setErr={setErr} />

            <div
              onClick={() => setCamModel(true)}
              className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
            >
              <img src={captureImg} alt="" className="w-6 " />
            </div>
          </div>
        )}

        <div className="w-full">
          <label className="block" htmlFor="field1">
            اسم المراقب:
          </label>
          <input
            className=" w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("field1", { required: true })}
          />
          {errors.field1 && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="field2">
            الادارة التابعة لها:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("field2", { required: true })}
          />
          {errors.field2 && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="field3">
            رقم الشاخص:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("field3", { required: true })}
          />
          {errors.field3 && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="category">
            تصنيف البلاغ:
          </label>

          <select
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            {...register("category", { required: true })}
          >
            <option value=""></option>
            <option value="البنية التحتية">البنية التحتية</option>
            <option value="الجاهزية">الجاهزية</option>
            <option value="1">الاعاشة</option>
            <option value="التشغيل والصيانة">التشغيل والصيانة</option>
            <option value="اخري">اخري</option>
          </select>
          {errors.category && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="description">
            وصف البلاغ:
          </label>
          <textarea
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="extraField">
            رقم التواصل:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="number"
            {...register("extraField", { required: true })}
          />
          {errors.extraField && <span className="text-red-500">مطلوب</span>}
        </div>

        <button
          type="submit"
          className="bg-[#1A6537] px-4 py-2 text-white flex justify-center items-center rounded cursor-pointer "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

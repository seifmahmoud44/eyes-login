import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import CameraCapture from "./CameraCapture";
import captureImg from "../assets/capture.png";
import closeImg from "../assets/close.png";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPost from "../hooks/useAxiosPost";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import backImg from "../assets/back-arrow.png";
import AudioRecorder from "./AudioRecorder";

const Form = () => {
  const navigate = useNavigate();
  const [uploadFile, setUploadFile] = useState("");
  const [camModel, setCamModel] = useState(false);
  const [recording, setRecording] = useState(false);
  const { state } = useLocation();
  const { type } = useParams();
  const { loading, sendData } = useAxiosPost();
  const audioHandler = (audio) => {
    setUploadFile(audio);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!uploadFile) {
      toast.error("يجب رفع فيديو او صورة او تسجيل صوت");
      return;
    }
    const finalData = {
      ...data,
      file_link: uploadFile,
      type_report: type,
      location_map: state.position,
      email_client: Cookies.get("email_client") || "",
    };
    console.log(finalData);
    sendData(
      "https://eye-almashaeir.com/backend/create/reporter.php?api=311958357932035780279254406072",
      finalData
    );
  };

  return (
    <div className=" flex justify-center items-center">
      <Toaster richColors position="bottom-center" />
      {camModel && (
        <div className="absolute top-0 left-0 w-full h-full z-[2000]">
          <CameraCapture
            setUploadFile={setUploadFile}
            setCamModel={setCamModel}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col justify-center items-center gap-2 py-10 w-[400px] max-md:w-full px-5"
      >
        <div
          onClick={() => navigate("/login")}
          className="bg-gray-300 absolute left-0 top-10  p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
        >
          <img src={backImg} alt="" className="w-6" />
        </div>

        {uploadFile && (
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
        )}
        <div className="flex justify-center items-center gap-6">
          {!uploadFile && !recording && (
            <div className="flex justify-center items-center gap-6">
              <FileUpload setUploadFile={setUploadFile} />
              <div
                onClick={() => setCamModel(true)}
                className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
              >
                <img src={captureImg} alt="" className="w-6 " />
              </div>
            </div>
          )}
          {!uploadFile && (
            <AudioRecorder setRecording={setRecording} onStop={audioHandler} />
          )}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="user_name">
            {type === "1" ? "اسم المراقب:" : "اسم مقدم البلاغ:"}
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("user_name", { required: true })}
          />
          {errors.user_name && <span className="text-red-500">مطلوب</span>}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="user_management">
            {type === "1" ? "الادارة التابع لها:" : "مكتب تقديم الخدمة:"}
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("user_management", { required: true })}
          />
          {errors.user_management && (
            <span className="text-red-500">مطلوب</span>
          )}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="registration_number">
            رقم الشاخص:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="text"
            {...register("registration_number")}
          />
        </div>

        <div className="w-full">
          <label className="block" htmlFor="report_category">
            تصنيف البلاغ:
          </label>
          <select
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            {...register("report_category", { required: true })}
          >
            <option value=""></option>
            <option value="1">البنية التحتية</option>
            <option value="2">الجاهزية</option>
            <option value="3">الإعاشة</option>
            <option value="4">التشغيل والصيانة</option>
            <option value="5">أخرى</option>
          </select>
          {errors.report_category && (
            <span className="text-red-500">مطلوب</span>
          )}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="report_description">
            وصف البلاغ:
          </label>
          <textarea
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            {...register("report_description", { required: true })}
          ></textarea>
          {errors.report_description && (
            <span className="text-red-500">مطلوب</span>
          )}
        </div>

        <div className="w-full">
          <label className="block" htmlFor="contact_number">
            رقم التواصل:
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="number"
            {...register("contact_number", { required: true })}
          />
          {errors.contact_number && <span className="text-red-500">مطلوب</span>}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-[#1A6537] px-4 py-2 text-white flex justify-center items-center rounded cursor-pointer"
        >
          {loading ? <BeatLoader color="#fff" /> : "ارسال"}
        </button>
      </form>
    </div>
  );
};

export default Form;

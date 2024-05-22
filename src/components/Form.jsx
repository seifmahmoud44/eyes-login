import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import CameraCapture from "./CameraCapture";
import captureImg from "../assets/capture.png";
import closeImg from "../assets/close.png";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";
import useAxiosPost from "../hooks/useAxiosPost";
import { BeatLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";

const Form = () => {
  const [uploadFile, setUploadFile] = useState("");
  const [camModel, setCamModel] = useState(false);
  const { state } = useLocation();
  const { type } = useParams();
  const { response, loading, error, sendData } = useAxiosPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!uploadFile) {
      toast.error("يجب رفع فيديو او صورة");
      return;
    }
    const finalData = {
      ...data,
      file_link: uploadFile,
      type_report: type,
      location_map: state.position,
    };
    console.log(finalData);
    sendData(
      "https://api-eyes.disgin.website/backend/create/reporter.php?api=311958357932035780279254406072",
      finalData
    );
  };

  return (
    <div className="flex justify-center items-center">
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
            <FileUpload setUploadFile={setUploadFile} />
            <div
              onClick={() => setCamModel(true)}
              className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
            >
              <img src={captureImg} alt="" className="w-6 " />
            </div>
          </div>
        )}

        <div className="w-full">
          <label className="block" htmlFor="user_name">
            {type === "0" ? "اسم المراقب:" : " اسم مقدم البلاغ:"}
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
            {type === "0" ? "الادارة التابعة لها:" : "مكتب تقديم الخدمة :"}
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
            {...register("registration_number", { required: true })}
          />
          {errors.registration_number && (
            <span className="text-red-500">مطلوب</span>
          )}
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
            <option value="0">البنية التحتية</option>
            <option value="1">الجاهزية</option>
            <option value="2">الاعاشة</option>
            <option value="3">التشغيل والصيانة</option>
            <option value="4">اخري</option>
          </select>
          {errors.category && <span className="text-red-500">مطلوب</span>}
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
          <PhoneInput
            country={"sa"}
            onlyCountries={["sa"]}
            localization={{
              ar: "السعودية",
            }}
            inputProps={{
              name: "contact_number",
              required: true,
            }}
            containerStyle={{
              width: "100%",
              position: "relative",
              zIndex: 0, // Ensure the container is relative for absolute positioning
            }}
            inputStyle={{
              width: "calc(100%)", // Adjust the width to make space for the country code
              border: "1px solid black",
              outline: "none",
              padding: "8px",
              paddingLeft: "45px", // Add padding to accommodate the country code
              borderRadius: "4px",
              position: "relative",
              zIndex: 1,
            }}
            buttonStyle={{
              position: "absolute",
              top: "50%",
              left: "10px", // Adjust the position of the country code to the left
              transform: "translateY(-50%)", // Center vertically
              backgroundColor: "#f1f1f1",
              color: "#000",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
              zIndex: 1,
            }}
            // You can add additional props as needed
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

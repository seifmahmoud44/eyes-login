import { useForm } from "react-hook-form";
import closeImg from "../assets/close-black.png";
import Cookies from "js-cookie";
import useAxiosUpdate from "../hooks/useAxiosUpdate";
import { toast } from "sonner";
const PasswordModel = ({ setPasswordModel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendData } = useAxiosUpdate();
  const dataUser = JSON.parse(Cookies.get("user_client"));

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      fixed_token: dataUser.fixed_token,
    };
    sendData(
      "https://eye-almashaeir.com/backend/update/login_client.php?api=311958357932035780279254406072",
      finalData
    )
      .then((e) => {
        if (e.request === "successfully") {
          Cookies.set("email_client", data.email_client);
          setPasswordModel(false);
          toast.warning("تم التعديل");
        } else {
          console.log(e);
          toast.error("حدث حطأ");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("حدث حطأ");
      });
  };
  console.log(Cookies.get("email_client"));
  return (
    <div className="fixed overflow-auto top-0 left-0 h-full w-screen bg-black bg-opacity-40 z-[2000] flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative  w-[500px] bg-white rounded-md p-7 flex flex-col gap-3"
      >
        <img
          onClick={() => setPasswordModel(false)}
          className="w-6 absolute left-4 top-4 cursor-pointer hover:scale-110 transition-all"
          src={closeImg}
          alt=""
        />
        <div className="w-full">
          <label className="block" htmlFor="email_client">
            ادخل الايميل الجديد
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="email"
            {...register("email_client", { required: true })}
            placeholder={Cookies.get("email_client") || "بريد جديد"}
          />
          {errors.email_client && <span className="text-red-500">مطلوب</span>}
        </div>
        <div className="w-full">
          <label className="block" htmlFor="password_client">
            ادخل كلمة السر الجديد
          </label>
          <input
            className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
            type="password"
            {...register("password_client", { required: true })}
          />
          {errors.password_client && (
            <span className="text-red-500">مطلوب</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#1A6537] px-4 py-2 text-white flex justify-center items-center rounded cursor-pointer"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default PasswordModel;

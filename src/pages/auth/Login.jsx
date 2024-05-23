import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { BeatLoader } from "react-spinners";
import useAxiosPost from "../../hooks/useAxiosPost";
import logo from "../../assets/logo.png";
import { useState } from "react";

const Login = () => {
  const { response, loading, error, sendData } = useAxiosPost();
  const [isEmail, useEmail] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
    };
    console.log(finalData);
    // sendData(
    //   "https://eye-almashaeir.com/backend/read/login_client.php?api=311958357932035780279254406072",
    //   finalData
    // );
  };

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <Toaster richColors position="bottom-center" />

      {isEmail ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-2 py-10 w-[400px] max-md:w-full px-5"
        >
          <img className="img w-[200px]" src={logo} alt="" />

          <div className="w-full">
            <label className="block" htmlFor="email_client"></label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="email"
              {...register("email_client", { required: true })}
              placeholder="البريد الالكتروني"
            />
            {errors.email_client && <span className="text-red-500">مطلوب</span>}
          </div>

          <div className="w-full">
            <label className="block" htmlFor="password_client"></label>
            <input
              className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black"
              type="password"
              {...register("password_client", { required: true })}
              placeholder="كلمة المرور"
            />
            {errors.password_client && (
              <span className="text-red-500">مطلوب</span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-[#1A6537] px-4 py-2 text-white flex justify-center items-center rounded cursor-pointer"
          >
            {loading ? <BeatLoader color="#fff" /> : "ارسال"}
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;

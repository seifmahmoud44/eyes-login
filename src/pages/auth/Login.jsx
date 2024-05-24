import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import useAxiosLogin from "../../hooks/useAxiosLogin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import Intro from "../../components/Intro";

const Login = () => {
  const { response, loading, error, sendData } = useAxiosLogin();
  const [isVerification, setVerification] = useState(true);
  const [registration, setregistration] = useState(false);
  const [clearIntro, setClearIntro] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (registration) {
      if (data.password_client !== data.reset_password_client) {
        return toast.warning("كلمة المرور غير متطابقة");
      }
    }

    const finalData = {
      ...data,
    };
    console.log(finalData);
    sendData(
      "https://eye-almashaeir.com/backend/read/login_client.php?api=311958357932035780279254406072",
      finalData
    );
  };

  const onSubmitVerificationEmail = async (data) => {
    const dataUser = Cookies.get("new_user");
    const dataUserObject = JSON.parse(dataUser);

    if (data.verification == dataUserObject.verification_email) {
      try {
        const response = await axios.post(
          "https://eye-almashaeir.com/backend/update/verification_email.php?api=311958357932035780279254406072",
          { fixed_token: dataUserObject.fixed_token },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.request === "successfully") {
          reset();
          toast.success("تم تأكيد البريد بنجاح");
          setVerification(true);
          setregistration(false);
          Cookies.remove("new_user");
        } else {
          console.log(response.data);
          toast.error("حدث خطأ");
        }
      } catch (error) {
        console.log(error);
        toast.error("حدث خطأ");
      }
    } else {
      toast.warning("كود التحقق غير صحيح");
    }
  };

  useEffect(() => {
    if (response) {
      if (response.request === "successfully") {
        Cookies.remove("new_user");
        Cookies.remove("verification_email");
        Cookies.set("user_client", JSON.stringify(response.message), {
          expires: 1,
        });

        if (response.message.powers_client === "1") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      } else if (response.request === "new_user") {
        toast.success("تم ارسال رمز التحقق على البريد");
        setVerification(false);

        Cookies.set("new_user", JSON.stringify(response.message), {
          expires: 1,
        });

        console.log(response);
      } else if (response.request === "email_verified") {
        toast.warning("الحساب غير مفعل - تم ارسال رمز التحقق على البريد");
        setVerification(false);

        Cookies.set("new_user", JSON.stringify(response.message), {
          expires: 1,
        });

        console.log(response);
      } else if (response.request === "error") {
        if (response.message === "password_incorrect") {
          toast.error("كلمة السر غير صحيحة");
        } else if (response.message === "no_user") {
          toast.warning("المستخدم غير مسجل");
        } else {
          toast.error("حدث خطأ");
          console.log(response);
        }
      } else {
        toast.error("حدث خطأ");
        console.log(response);
      }
    }

    const loadHandler = () => {
      gsap.to(".intro", {
        y: "-100%",
        ease: "power2.in",
        delay: 2, // Delay of 2 seconds
        onComplete: () => {
          setClearIntro(true);
        },
      });
    };
    loadHandler();

    return () => {
      window.removeEventListener("load", loadHandler);
    };
  }, [response]);

  return (
    <>
      {!clearIntro && (
        <div className="intro relative z-20">
          <Intro />
        </div>
      )}

      {clearIntro && (
        <div className="flex justify-center items-center w-[100%] h-[100vh]">
          <Toaster richColors position="bottom-center" />

          {isVerification ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ boxShadow: "0 0 30px #ccc" }}
              className="flex flex-col justify-center items-center gap-2 py-10 w-[400px] max-md:w-full px-5 rounded-lg m-[20px]"
            >
              <img className="img w-[280px]" src={logo} alt="" />

              <div className="w-full">
                <label className="block" htmlFor="email_client"></label>
                <input
                  className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black text-center"
                  type="email"
                  {...register("email_client", { required: true })}
                  placeholder="البريد الالكتروني"
                />
                {errors.email_client && (
                  <span className="text-red-500">مطلوب</span>
                )}
              </div>

              <div className="w-full">
                <label className="block" htmlFor="password_client"></label>
                <input
                  className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black text-center"
                  type="password"
                  {...register("password_client", { required: true })}
                  placeholder="كلمة المرور"
                />
                {errors.password_client && (
                  <span className="text-red-500">مطلوب</span>
                )}
              </div>

              {registration && (
                <div className="w-full">
                  <label
                    className="block"
                    htmlFor="reset_password_client"
                  ></label>
                  <input
                    className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black text-center"
                    type="password"
                    {...register("reset_password_client", { required: true })}
                    placeholder="اعادة كلمة المرور"
                  />
                  {errors.reset_password_client && (
                    <span className="text-red-500">مطلوب</span>
                  )}
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="bg-[#1A6537] px-8 py-2 text-white flex justify-center items-center rounded cursor-pointer"
              >
                {loading ? (
                  <BeatLoader color="#fff" />
                ) : registration ? (
                  "تسجيل حساب جديد"
                ) : (
                  "تسجيل دخول"
                )}
              </button>

              <p
                className="cursor-pointer"
                onClick={() => {
                  setregistration(!registration);
                  reset();
                }}
              >
                {!registration ? "تسجيل حساب جديد" : "تسجيل دخول"}
              </p>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitVerificationEmail)}
              style={{ boxShadow: "0 0 30px #ccc" }}
              className="flex flex-col justify-center items-center gap-2 py-10 w-[400px] max-md:w-full px-5 rounded-lg m-[20px]"
            >
              <div className="w-full">
                <label className="block" htmlFor="verification"></label>
                <input
                  className="w-full border focus-visible:outline-none py-2 px-4 rounded focus:border-black text-center"
                  type="text"
                  {...register("verification", { required: true })}
                  placeholder="رمز التحقق"
                />
                {errors.verification && (
                  <span className="text-red-500">مطلوب</span>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="bg-[#1A6537] px-8 py-2 text-white flex justify-center items-center rounded cursor-pointer"
              >
                {loading ? <BeatLoader color="#fff" /> : "تحقق"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Login;

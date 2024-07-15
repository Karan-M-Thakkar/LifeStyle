import { useNavigate, useSearchParams } from "react-router-dom";
import authPageImg from "../assets/images/auth-page-banner-img.svg";
import LoginForm from "../Components/Auth/LoginForm";
import SignupForm from "../Components/Auth/SignupForm";
import { GoogleLogin } from "@react-oauth/google";
import { AnimatePresence } from "framer-motion";
import { http } from "../utils/apis";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../Store";
import { motion } from "framer-motion";
import Logo from "../Components/UI/Logo";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mode = searchParams.get("mode") || "login";

  const loginWithGoogle = async ({ credential: googleAccessToken }) => {
    try {
      const response = await http({
        method: "POST",
        endPointPath: "/auth/login-with-google",
        payload: { googleAccessToken },
      });

      const { token, user } = response;
      console.log(user);
      Cookies.set("token", token);
      dispatch(authActions.login());
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <motion.section className="lg:flex w-screen-xl">
      <div className="lg:w-1/2 lg:shrink-0 p-4 md:p-8">
        <div className="text-center text-4xl font-[caveat] flex justify-center items-center">
          level up your life&nbsp;
          <span className="hidden lg:inline-block">with &nbsp;</span>
          <Logo />
        </div>
        <img
          src={authPageImg}
          alt="image of a woman browsing styles website"
          className="hidden lg:block"
        />
      </div>
      <motion.div className="px-4 py-8 md:p-8 w-full md:w-2/3 md:mx-auto lg:grow overflow-hidden bg-fuchsia-50">
        <div className="w-fit mx-auto">
          <GoogleLogin
            className="text-center"
            onSuccess={(credentialResponse) =>
              loginWithGoogle(credentialResponse)
            }
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <hr className="mt-8 mb-2 border-fuchsia-600" />
        <p className="w-16 mt-[-20px] text-center mx-auto bg-fuchsia-50">OR</p>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === "login" && <LoginForm key="login" />}
            {mode === "sign-up" && <SignupForm key="sign-up" />}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  );
}

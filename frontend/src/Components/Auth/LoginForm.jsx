import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/apis";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PasswordInput from "../UI/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store";
import Logo from "../UI/Logo";

const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileValidator = /^\d+$/;

const INITIAL_VALIDATION_STATE = {
  identifier: "",
  password: "",
};

const getIdentifierType = (identifier) => {
  if (!identifier) {
    return {
      isValid: false,
    };
  }

  if (emailValidator.test(identifier)) {
    return {
      isValid: true,
      type: "email",
    };
  } else if (mobileValidator.test(identifier)) {
    return {
      isValid: true,
      type: "nationalNumber",
    };
  } else {
    return {
      isValid: false,
    };
  }
};

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [validation, setValidation] = useState(INITIAL_VALIDATION_STATE);

  const { isOnline } = useSelector((state) => state.auth);

  const { mutate, isPending } = useMutation({
    mutationFn: http,
    onSuccess: (data) => {
      const { token } = data;
      Cookies.set("token", token);
      navigate("/");
      dispatch(authActions.login());
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;
    const formData = new FormData(e.target);

    const credentials = Object.fromEntries(formData.entries());
    const { identifier, password } = credentials;

    const { isValid, type } = getIdentifierType(identifier);

    if (!identifier || !isValid) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        identifier: "Please enter valid email or mobile no.",
      }));
    }

    if (!password || (password && password.length < 6)) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        password: "Please enter password with at least 6 characters",
      }));
    }

    if (isFormValid) {
      if (isOnline) {
        mutate({
          method: "POST",
          endPointPath: "/auth/login",
          payload: { ...credentials, identifierType: type },
        });
      } else {
        toast.error(
          "You seem to be offline! Please check your internet connection"
        );
      }
    }
  };

  const handleChange = (e) => {
    setValidation((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  return (
    <motion.section
      className="p-4 md:py-4 md:px-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <h2 className="text-xl text-fuchsia-700 text-center mb-8 flex gap-2 justify-center items-center">
        Login to <Logo />
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="identifier"
          label="Email or Mobile No."
          invalid={validation.identifier}
          onChange={handleChange}
          className="mb-6"
        />
        <PasswordInput
          type="password"
          name="password"
          label="Password"
          invalid={validation.password}
          onChange={handleChange}
          toggleable
        />
        <div className="flex flex-col-reverse gap-8 items-stretch lg:flex-row md:justify-between md:items-center mt-6">
          <p className="self-center">
            Don&apos;t have an account?{" "}
            <Link
              to="?mode=sign-up"
              className="text-fuchsia-600 hover:underline underline-offset-8 decoration-fuchsia-600"
            >
              Sign up
            </Link>
          </p>
          <Button
            showLoader={isPending}
            disabled={isPending}
            loaderClass="w-4 border-2 border-white"
          >
            Log In
          </Button>
        </div>
      </form>
    </motion.section>
  );
}

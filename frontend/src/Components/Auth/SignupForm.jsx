import { motion } from "framer-motion";
import { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import PasswordInput from "../UI/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/apis";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store";

const INITIAL_VALIDATION_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  password: "",
  identifier: "",
};

const ValidationErrorMsg = ({ message, className }) => (
  <p className={`text-red-500 font-[Roboto] text-sm ${className}`}>{message}</p>
);

export default function SignupForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [mobile, setMobile] = useState("");
  const [validation, setValidation] = useState(INITIAL_VALIDATION_STATE);

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      http({ method: "POST", endPointPath: "/auth/sign-up", payload: data }),
    onSuccess: (data) => {
      const { token } = data;
      if (token) {
        Cookies.set("token", token, { expires: 1 / 24 });
      }
      dispatch(authActions.login());
      navigate("/");
      toast.success("Signed-up Successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleMobileChange = (value) => {
    setValidation((prev) => ({
      ...prev,
      mobileNo: "",
      identifier: "",
    }));

    setMobile(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;

    const formData = new FormData(e.target);

    const userDetails = Object.fromEntries(formData.entries());

    const { firstName, lastName, email, password, confirmPassword } =
      userDetails;

    if (!firstName) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        firstName: "Please enter first name",
      }));
    }

    if (!lastName) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        lastName: "Please enter last name",
      }));
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
      setValidation((prev) => ({
        ...prev,
        email: "Please enter valid email",
      }));
    }

    if (mobile && !isValidPhoneNumber(mobile)) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        mobileNo: "Please enter valid mobile no.",
      }));
    }

    if (!email && !mobile) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        identifier: "Please enter at least one of email or mobile no.",
      }));
    }

    if (!password || password.length < 6) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        password: "Please enter password with at least 6 characters",
      }));
    }

    if (!confirmPassword || confirmPassword.length < 6) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        confirmPassword: "Please enter password with at least 6 characters",
      }));
    }

    if (password && confirmPassword && password !== confirmPassword) {
      isFormValid = false;
      setValidation((prev) => ({
        ...prev,
        confirmPassword: "Password and Confirm Password must match",
      }));
    }

    if (isFormValid) {
      const mobileData = parsePhoneNumber(mobile || "");
      const { countryCallingCode, nationalNumber } = mobileData || {};

      mutate({
        ...userDetails,
        countryCallingCode,
        nationalNumber,
        mobile: mobile !== "" ? mobile : undefined,
      });
    }
  };

  const handleChange = (e) => {
    setValidation((prev) => ({
      ...prev,
      [e.target.name]: "",
      identifier: e.target.name === "email" ? "" : prev.identifier,
    }));
  };

  return (
    <motion.section
      className="p-4 md:py-4 md:px-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <h2 className="text-xl font-normal text-fuchsia-700 text-center mb-8">
        Create an account
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              label="First Name"
              name="firstName"
              invalid={validation.firstName}
              onChange={handleChange}
              className="mb-6"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              invalid={validation.lastName}
              className="mb-6"
            />
          </div>
        </div>
        <div className="flex flex-col mb-4 gap-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Input
                type="email"
                label="E-mail"
                name="email"
                onChange={handleChange}
                invalid={validation.email}
                highlightError={validation.identifier}
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full flex flex-col gap-2">
                <label className="text-xs font-medium">Mobile No.</label>
                <PhoneInput
                  country="IN"
                  value={mobile}
                  onChange={handleMobileChange}
                  invalid={validation.mobileNo || undefined}
                  highlight-error={validation.identifier || undefined}
                />
              </div>
            </div>
          </div>
          {validation.identifier && (
            <ValidationErrorMsg
              message={validation.identifier}
              className="mt-0"
            />
          )}
        </div>
        <PasswordInput
          label="Password"
          name="password"
          toggleable
          onChange={handleChange}
          invalid={validation.password}
          className="mb-6"
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          invalid={validation.confirmPassword}
          className="mb-6"
        />
        <div className="flex flex-col-reverse gap-8 items-stretch lg:flex-row justify-between md:items-center mt-6">
          <div className="self-center flex md:flex-col gap-2 md:gap-1">
            <p>Already have an account?</p>
            <Link
              className="text-fuchsia-600 hover:underline underline-offset-8 decoration-fuchsia-600"
              to="?mode=login"
            >
              Login
            </Link>
          </div>
          <Button
            showLoader={isPending}
            disabled={isPending}
            loaderClass="w-4 border-2 border-white"
          >
            Create Account
          </Button>
        </div>
      </form>
    </motion.section>
  );
}

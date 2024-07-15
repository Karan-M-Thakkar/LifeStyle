import { FaRegPaperPlane } from "react-icons/fa";
import Input from "./Input";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../utils/apis";
import Loader from "./Loader";
import { toast } from "react-toastify";

const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ValidationErrorMsg = ({ message, className }) => (
  <p
    className={`text-red-500 mt-[-12px] mb-4 font-[Roboto] text-sm ${className}`}
  >
    {message}
  </p>
);

export default function SubscribeNewsLetter() {
  const emailRef = useRef();
  const [isInvalid, setIsInvalid] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (email) =>
      http({
        method: "POST",
        endPointPath: "/auth/subscribe-to-newsletter",
        payload: { email },
      }),
    onSuccess: (data) => {
      emailRef.current.value = "";
      toast.success(data?.message);
    },
    onError: (error) =>
      toast.error(
        error.message || "Unable to add you in subscribers list at the moment"
      ),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();

    if (email && emailValidator.test(email)) {
      mutate(email);
    } else {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
    }
  };

  return (
    <>
      <p className="font-medium mb-4">Get 10% off of your first order</p>
      <form
        className="flex items-center border-2 rounded-md border-fuchsia-300"
        onSubmit={handleSubmit}
      >
        <Input
          ref={emailRef}
          placeholder="Enter your email"
          invalid={isInvalid}
        />
        <button className="p-3">
          {isPending && (
            <Loader loaderClass="w-4 border-fuchsia-700 border-2" />
          )}
          {!isPending && <FaRegPaperPlane />}
        </button>
      </form>
      {isInvalid && (
        <ValidationErrorMsg
          message="Please enter a valid email!"
          className="mt-2"
        />
      )}
    </>
  );
}

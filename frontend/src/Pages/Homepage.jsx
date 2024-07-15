/* import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import Button from "../Components/UI/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; */

export default function HomePage() {
  /* const token = Cookies.get("token");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        "http://localhost:8080/user/add-to-wishlist",
        {
          method: "POST",
          body: JSON.stringify({ productId: "3456" }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong!");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => toast(data.message),
    onError: () => navigate("/auth"),
  });

  const doSomeRestrictiveMutation = () => {
    mutate();
  }; */

  return "";
}

import Cookies from "js-cookie";
import CustomError from "./custom-error";

const BACKEND_URL = "http://localhost:8080";

export async function http({ method, endPointPath, payload, signal }) {
  try {
    if (!navigator.onLine) {
      throw new CustomError(
        "You're currently offline, please check your internet connection"
      );
    }

    const options = {
      method,
      headers: {},
    };

    if (signal) {
      options.signal = signal;
    }

    if (method !== "GET" && payload) {
      options.body = JSON.stringify(payload);
      options.headers["Content-Type"] = "application/json";
    }

    const token = Cookies.get("token");
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BACKEND_URL}${endPointPath}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new CustomError(
        error.message ||
          "Something went wrong, please try again after sometime.",
        error.code,
        error.info
      );
    }

    const data = await response.json();

    return data;
  } catch (err) {
    throw new CustomError(
      err.code
        ? err.message
        : "Something went wrong, please try again after sometime."
    );
  }
}

/* export async function signUp(userDetails) {
  const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error?.message ||
        "Unable to sign-up due to some problem on server,please try again"
    );
  }

  const data = await response.json();
  return data;
} */

/* export async function login(credentials) {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Unable to login, please try again");
  }

  const data = await response.json();
  return data;
} */

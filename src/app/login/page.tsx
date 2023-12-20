"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login faild", error?.response?.data);
      setErrorMsg(error?.response?.data?.error);
      toast.error(String(error?.response?.data?.error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="form-container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-xs">
        <h1 className="mt-1 p-10"></h1>
        <div className="heading">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {loading ? "Processing..." : "Welcome"}
            </span>{" "}
            Login Page
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Welcome to the Website.Please Login to your account
          </p>
        </div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="enter email address"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e?.target?.value })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e?.target?.value })}
            />

            <h2 className="text-red-300 p-3">{errorMsg}</h2>
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${
                buttonDisabled
                  ? "bg-rose-600"
                  : "bg-purple-600 hover:bg-blue-700"
              }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6`}
              type="button"
              onClick={onLogin}
            >
              {buttonDisabled ? "No login" : "Login"}
            </button>
          </div>
          <Link href="/signup" className="underline">
            Visit Signup Page
          </Link>
        </form>
      </div>
    </div>
  );
}

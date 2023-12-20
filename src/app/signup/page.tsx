"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  console.log(user);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Successfully Signed up");
      router.push("/login");
    } catch (error: any) {
      console.log("signup faild", error?.response?.data);
      setErrorMsg(error?.response?.data?.error);
      console.log(error?.response?.data?.error);
      toast.error(String(error?.response?.data?.error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="form-container">
      <div className="w-full max-w-xs">
        <h1 className="mt-10 p-10">
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          {loading ? "Processing..." : "Welcome to Signup"}
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e?.target?.value })}
            />
          </div>

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
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="enter password"
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e?.target?.value })}
            />

            <h2 className="text-red-300 p-3">{errorMsg}</h2>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
              type="button"
              onClick={onSignup}
            >
              {buttonDisabled ? "No Signup" : "Signup"}
            </button>
          </div>
          <Link href="/login" className="underline">
            Visit Login Page
          </Link>
        </form>
      </div>
    </div>
  );
}

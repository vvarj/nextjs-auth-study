"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("no data");
  const [info, setInfo] = React.useState({
    id: "no-id",
    username: "no-name",
    name: "guest",
    email: "no-email",
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      toast.success("Logout Sucessfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(String(error.message));
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log(response.data.data);
    setData(String(response.data.data._id));
    setInfo({
      id: response.data.data._id,
      username: response.data.data?.username,
      name: response.data.data?.name,
      email: response.data.data?.email,
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="top-bar mt-10">
        <button
          onClick={getUserDetails}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Get Data
          </span>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </button>
        <div className="button">
          {data === "no data" ? (
            ""
          ) : (
            <Link
              href={`/profile/${data}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Go To Profile
            </Link>
          )}
        </div>
      </div>
      <div className="table-data mt-10">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  username
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {info?.username}
                </th>
                <td className="px-6 py-4">{info?.email}</td>
                <td className="px-6 py-4">{info?.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

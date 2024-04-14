"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", formdata);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center space-y-5 items-center text-lg font-bold w-full text-white">
      <h1>Sign up</h1>
      <div className="text-md font-semibold">
        <p>Name</p>
        <input
          type="text"
          name="name"
          className="bg-white rounded-xl text-sm py-1.5 px-3"
          placeholder="Enter name"
          onChange={(e) =>
            setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
        />
        <p>Username</p>
        <input
          type="text"
          name="username"
          className="bg-white rounded-xl text-sm py-1.5 px-3"
          placeholder="Enter username"
          onChange={(e) =>
            setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
        />
        <p>Email</p>
        <input
          type="text"
          name="email"
          className="bg-white rounded-xl text-sm py-1.5 px-3"
          placeholder="Enter email"
          onChange={(e) =>
            setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
        />
        <p>Password</p>
        <input
          type="text"
          name="password"
          className="bg-white rounded-xl text-sm py-1.5 px-3 text-black"
          placeholder="Enter password"
          onChange={(e) =>
            setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
        />
      </div>
      <button
        onClick={onSignup}
        className="border-[0.5px] p-2 border-white rounded-xl"
      >
        Sign Up here
      </button>
    </div>
  );
};

export default Signup;

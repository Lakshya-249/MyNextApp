"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
  });
  const onLogin = async () => {
    const response = await axios.post("/api/users/login", formdata);
    console.log(response.data);
  };
  return (
    <div className="flex flex-col justify-center space-y-5 items-center text-lg font-bold w-full text-white">
      <h1>Login</h1>
      <div className="text-md font-semibold">
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
        <p>Password</p>
        <input
          type="text"
          name="password"
          className="bg-white rounded-xl text-sm py-1.5 px-3"
          placeholder="Enter password"
          onChange={(e) =>
            setformdata({ ...formdata, [e.target.name]: e.target.value })
          }
        />
      </div>
      <button
        onClick={onLogin}
        className="border-[0.5px] p-2 border-white rounded-xl"
      >
        Login here
      </button>
      <Link href="/signup" className="text-sm font-light">
        View sign up page here
      </Link>
    </div>
  );
}

export default LoginPage;

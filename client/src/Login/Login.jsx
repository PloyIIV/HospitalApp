import React, { useState } from "react";
import { useAuth } from "../contexts/authenContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const exclamationMark = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Outline"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="red"
  >
    <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
    <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" />
    <rect x="11" y="17" width="2" height="2" rx="1" />
  </svg>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await login(value);
    if (response?.message) {
      setErrorMessage(response.message);
    }
    console.log(response)
  };

  return (
    <div className='bg-[url("https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg?semt=ais_hybrid&w=740")] w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className="w-full mx-3 md:w-1/2 bg-white/80 shadow-xl flex flex-col justify-center items-center rounded-3xl">
        <h1 className="font-bold text-2xl pt-5">ยินดีต้อนรับ</h1>
        <p>กรุณาเข้าสู่ระบบ</p>
        <hr className="w-[80%] my-3 border border-blue-200" />
        <div className="w-full lg:w-1/2 px-5 lg:px-0 mb-3 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <label htmlFor="username">ชื่อผู้ใช้</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setValue({ ...value, username: e.target.value })}
              placeholder="ชื่อบัญชีผู้ใช้"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
              required
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              placeholder="รหัสผ่าน"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
              required
            />
          </div>
          {errorMessage ? (
            <div className="flex items-center text-red-600">
              {exclamationMark}
              <p className="ml-2">{errorMessage}</p>
            </div>
          ) : (
            <></>
          )}
          <button
            className="w-full bg-blue-500 py-3 my-3 rounded-4xl cursor-pointer text-white hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
          <div className="w-full flex justify-between">
            <p className="cursor-pointer hover:text-blue-600">ลืมรหัสผ่าน</p>
            <p
              onClick={() => navigate("/register")}
              className="cursor-pointer hover:text-blue-600"
            >
              ลงทะเบียน
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

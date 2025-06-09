import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authenContext";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    tel: "",
    sex: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await register(value);
    toast(response.message);
  };
  return (
    <div className='bg-[url("https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg?semt=ais_hybrid&w=740")] w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center'>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className="w-full mx-3 md:w-1/2 bg-white/80 shadow-xl flex flex-col justify-center items-center rounded-3xl">
        <div className="w-full flex flexcol justify-center">
          <div className="absolute w-full md:w-1/2">
            <button
              onClick={() => navigate("/login")}
              className="relative w-8 h-8 rounded-full bg-blue-500 text-white top-5 left-1/12 cursor-pointer"
            >
              ❮
            </button>
          </div>
          <h1 className="font-bold text-2xl pt-5">ลงทะเบียน</h1>
        </div>
        <hr className="w-[80%] my-3 border border-blue-200" />
        <div className="w-full lg:w-1/2 px-5 lg:px-0 mb-3 flex flex-col items-center">
          <div className="w-full flex flex-col">
            <label htmlFor="firstname" className="ml-3">
              ชื่อ
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) =>
                setValue({ ...value, firstname: e.target.value })
              }
              placeholder="กรอกชื่อ"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="lastname" className="ml-3">
              นามสกุล
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setValue({ ...value, lastname: e.target.value })}
              placeholder="กรอกนามสกุล"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
            />
          </div>

          <div className="w-full flex flex-col">
            <label htmlFor="username" className="ml-3">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setValue({ ...value, username: e.target.value })}
              placeholder="กรอกชื่อบัญชีผู้ใช้"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="password" className="ml-3">
              รหัสผ่าน
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              placeholder="กรอกรหัสผ่าน"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
              required
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="sex" className="ml-3 mb-2">
              เพศ
            </label>
            <div className="flex gap-2 justify-around">
              <label
                htmlFor="female"
                className="w-1/2 px-3 py-2 flex border border-gray-300 rounded-2xl has-checked:border-pink-600 has-checked:bg-pink-100"
              >
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  value="female"
                  onClick={(e) => setValue({ ...value, sex: e.target.value })}
                />
                <p className="ml-3">หญิง</p>
              </label>
              <label
                htmlFor="male"
                className="w-1/2 px-3 py-2 flex border border-gray-300 rounded-2xl has-checked:border-blue-600 has-checked:bg-blue-100"
              >
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  value="male"
                  onClick={(e) => setValue({ ...value, sex: e.target.value })}
                />
                <p className="ml-3">ชาย</p>
              </label>
            </div>
          </div>

          <div className="w-full flex flex-col my-3">
            <label htmlFor="tel" className="ml-3">
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              name="tel"
              id="tel"
              onChange={(e) => setValue({ ...value, tel: e.target.value })}
              placeholder="กรอกเบอร์โทรศัพท์"
              className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
            />
          </div>
          <button
            
            className="w-full bg-blue-400 py-3 rounded-3xl text-white font-semibold cursor-pointer"
          >
            ลงทะเบียน
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

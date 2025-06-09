import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authenContext";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const { url } = useAuth();
  const [loading, setLoading] = useState(null);
  const [value, setValue] = useState({
    username: "",
    password: "",
    tel: "",
    sex: "",
    firstname: "",
    lastname: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const response = await axios.put(`${url}/auth/profile`, value);
    toast(response.data.message)
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(`${url}/auth`);
      setValue(data.data[0]);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className='bg-[url("https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg?semt=ais_hybrid&w=740")] w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center'>
      <ToastContainer />
      <form
        onSubmit={onSubmitHandler}
        className="w-full mx-3 md:w-1/2 bg-white/80 shadow-xl flex flex-col justify-center items-center rounded-3xl"
      >
        <div className="w-full flex flexcol justify-center">
          <div className="absolute w-full md:w-1/2">
            <button
              onClick={() => navigate("/")}
              className="relative w-8 h-8 rounded-full bg-blue-500 text-white top-5 left-1/12 cursor-pointer"
            >
              ❮
            </button>
          </div>
          <h1 className="font-bold text-2xl pt-5">แก้ไขข้อมูลส่วนตัว</h1>
        </div>
        <hr className="w-[80%] my-3 border border-blue-200" />

        {!loading ? (
          <div className="w-full lg:w-1/2 px-5 lg:px-0 mb-3 flex flex-col items-center">
            <div className="w-full flex flex-col">
              <label htmlFor="firstname" className="ml-3">
                ชื่อ
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={value.firstname}
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
                value={value.lastname}
                onChange={(e) =>
                  setValue({ ...value, lastname: e.target.value })
                }
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
                value={value.username}
                onChange={(e) =>
                  setValue({ ...value, username: e.target.value })
                }
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
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
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
                  className={`w-1/2 px-3 py-2 flex border rounded-2xl ${
                    value.sex === "male"
                      ? "border-blue-600 bg-blue-100"
                      : "border-pink-600 bg-pink-100"
                  }`}
                >
                  <input
                    type="radio"
                    id="female"
                    name="sex"
                    value={value.sex}
                    defaultChecked
                  />
                  <p className="ml-3">
                    {value.sex === "male" ? "ชาย" : "หญิง"}
                  </p>
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
                value={value.tel}
                onChange={(e) => setValue({ ...value, tel: e.target.value })}
                placeholder="กรอกเบอร์โทรศัพท์"
                className="w-full rounded-4xl shadow-inner my-2 py-2 px-5"
              />
            </div>
            <button
              onClick={onSubmitHandler}
              className="w-full bg-blue-400 py-3 rounded-3xl text-white font-semibold cursor-pointer"
            >
              แก้ไขข้อมูล
            </button>
          </div>
        ) : (
          <>Loading..</>
        )}
      </form>
    </div>
  );
};

export default EditProfile;

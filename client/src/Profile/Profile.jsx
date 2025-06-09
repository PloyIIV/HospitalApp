import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authenContext";

const Profile = ({ id }) => {
  const { url } = useAuth();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/auth/profile/${id}`);
      setData(response.data.data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white border absolute w-[20%] h-[30%] -translate-y-1/2 top-1/2 transform -translate-x-1/2 left-1/2 rounded-2xl flex flex-col items-center">
      <div>
        <h1 className="py-2 font-semibold text-xl">ข้อมูลคนไข้</h1>
      </div>
      <hr className="border w-full" />
      <div className="mt-2 ml-5 w-full">
        <p className="mb-2">
          ชื่อ: คุณ{data.firstname} {data.lastname}
        </p>
        <p className="mb-2">ชื่อผู้ใช้: {data.username}</p>
        <p className="mb-2">เพศ: {data.sex}</p>
        <p className="mb-2">เบอร์โทรศัพท์: {data.tel}</p>
      </div>
      <label htmlFor="moreInfo">หมายเหตุอื่นๆ:</label>
      <textarea
        name="moreInfo"
        id="moreInfo"
        className="border w-[90%]"
        value={"user id: " + data.user_id}
      ></textarea>
    </div>
  );
};

export default Profile;

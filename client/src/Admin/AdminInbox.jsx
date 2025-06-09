import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authenContext";
import Profile from "../Profile/Profile";

const logoutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="white"
  >
    <path d="M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z" />
    <path d="M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z" />
  </svg>
);
const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="white"
  >
    <g id="_01_align_center" data-name="01 align center">
      <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
    </g>
  </svg>
);

const AdminInbox = () => {
  const { state, logout } = useAuth();
  const [expandId, setExpandId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("id, user_id, created_at")
        .order("created_at", { ascending: false });
      setRooms(data);
    };
    fetchRooms();
  }, []);
  return (
    <div className='bg-[url("https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg?semt=ais_hybrid&w=740")] w-screen h-screen bg-no-repeat bg-cover'>
      <div className="flex flex-col sm:flex-row justify-between mx-10 pt-5">
        <div className="sm:w-80 bg-white/80 flex justify-between p-3 rounded-2xl shadow-2xl">
          <div className="flex">
            <img
              className="w-14 rounded-full"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile"
            />
            <div className="ml-3">
              <p className="text-lg font-semibold">
                คุณ{state.firstname} {state.lastname}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute sm:static top-10 right-13">
          <button
            onClick={logout}
            className="flex justify-center items-center px-4 py-3 sm:py-2 rounded-2xl bg-red-700 text-white cursor-pointer"
          >
            {logoutIcon}
            <p className="ml-2 hidden sm:block">Logout</p>
          </button>
        </div>
      </div>

      <div className="mx-10">
        <div className="w-full bg-white/80 shadow-2xl mt-5 rounded-2xl px-10">
          <h1 className="py-4 text-center text-xl font-semibold">
            เลือกห้องแชทคนไข้
          </h1>
          <hr className="border-gray-300 mb-3" />
          <div className="pb-2">
            {rooms.map((room) => {
              const isExpanded = expandId === room.user_id;
              return (
                <div
                  key={room.id}
                  className="bg-white flex justify-between p-3 mb-1 mx-2 rounded-2xl shadow-2xl border border-gray-100 cursor-pointer hover:bg-blue-300"
                >
                  <button
                    onClick={() => navigate(`/inbox/${room.id}`)}
                    className="w-full text-start cursor-pointer"
                  >
                    ห้องผู้ใช้ {room.user_id}
                  </button>
                  <div
                    onClick={() =>
                      setExpandId(isExpanded ? null : room.user_id)
                    }
                    className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full cursor-pointer hover:bg-blue-200 hover:border-2 hover:border-blue-400"
                  >
                    {searchIcon}
                    {isExpanded ? <Profile id={room.user_id} /> : <></>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;

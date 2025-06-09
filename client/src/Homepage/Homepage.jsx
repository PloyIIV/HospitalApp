import React from "react";
import { useAuth } from "../contexts/authenContext";
import Message from "../ui/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const editProfileIcon = <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm7.086,12h-3.086s0-3.086,0-3.086l7.275-7.275c.852-.852,2.234-.852,3.086,0h0c.852,.852,.852,2.234,0,3.086l-7.275,7.275Zm-5.086,0H0v-5c0-2.757,2.243-5,5-5H13c1.145,0,2.189,.403,3.033,1.053l-5.033,5.033v3.914Z"/></svg>
const notiIcon = <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20" fill="#ffaa48"><path d="m16.899,20c-.465,2.279-2.485,4-4.899,4s-4.435-1.721-4.899-4h9.799Zm3.601-13c1.93,0,3.5-1.57,3.5-3.5s-1.57-3.5-3.5-3.5-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5Zm.24,1.988c-.08.003-.159.012-.24.012-3.033,0-5.5-2.467-5.5-5.5,0-.904.223-1.756.612-2.509-1.182-.635-2.526-.991-3.936-.991C7.775,0,4.398,2.709,3.552,6.516l-2.35,7.597c-.597,1.93.846,3.886,2.866,3.886h15.656c2.08,0,3.529-2.065,2.821-4.021l-1.806-4.992Z"/></svg>
const logoutIcon = <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M11.476,15a1,1,0,0,0-1,1v3a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7.476a3,3,0,0,1,3,3V8a1,1,0,0,0,2,0V5a5.006,5.006,0,0,0-5-5H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7.476a5.006,5.006,0,0,0,5-5V16A1,1,0,0,0,11.476,15Z"/><path d="M22.867,9.879,18.281,5.293a1,1,0,1,0-1.414,1.414l4.262,4.263L6,11a1,1,0,0,0,0,2H6l15.188-.031-4.323,4.324a1,1,0,1,0,1.414,1.414l4.586-4.586A3,3,0,0,0,22.867,9.879Z"/></svg>

const Homepage = () => {
    const navigate = useNavigate();
    const { state, logout } = useAuth();
  return (
    <div className='bg-[url("https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg?semt=ais_hybrid&w=740")] w-screen h-screen bg-no-repeat bg-cover'>
        <div className="flex flex-col sm:flex-row justify-between mx-10 pt-5">
            <div className="sm:w-80 bg-white/80 flex justify-between p-3 rounded-2xl shadow-2xl">
                <div className="flex">
                    <img className="w-14 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" />
                    <div className="ml-3">
                        <p className="text-lg font-semibold">คุณ{state.firstname} {state.lastname}</p>
                        <p>HN: 1148246</p>
                    </div>
                </div>
                <div onClick={() => navigate(`/profile/${state.id}`)} className="bg-gray-200 justify-center items-center rounded-full w-14 hidden sm:flex cursor-pointer">
                    {editProfileIcon}
                </div>
            </div>
            <div className="absolute sm:static top-10 right-13">
                <button onClick={logout} className="flex justify-center items-center px-4 py-3 sm:py-2 rounded-2xl bg-red-700 text-white cursor-pointer">
                    {logoutIcon}
                    <p className="ml-2 hidden sm:block">Logout</p>
                </button>
            </div>
        </div>
        <div className="mx-10">
            <Message id={state.id} />
        </div>
    </div>
  );
};

export default Homepage;

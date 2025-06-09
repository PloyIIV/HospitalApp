import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authenContext";
import { supabase } from "../utils/supabaseClient";

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

const AdminChatRoom = () => {
  const { state, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await supabase.from("messages").insert([
      {
        room_id: param.roomId,
        sender_id: state.id,
        sender_role: "admin",
        text: input,
        inserted_at: new Date()
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", param.roomId)
        .order("created_at");
      setMessages(data);
    };

    const channel = supabase
      .channel("admin-chat" + param.roomId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${param.roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [param.roomId, messages]);
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
          <div className="absolute">
            <button
              onClick={() => navigate("/")}
              className="bg-white relative top-3 right-3 w-10 h-10 rounded-full text-blue-500 cursor-pointer"
            >
              ❮
            </button>
          </div>
          <h1 className="py-4 text-center text-xl font-semibold">
            <span className="hidden sm:inline">💬 Message with </span>Room{" "}
            {param.roomId}
          </h1>
          <hr className="border-gray-300 mb-3" />
          <div className="max-h-[50vh] md:max-h-[70vh] overflow-auto">
            {messages?.map((msg) => (
              <div
                key={msg.id}
                className={`mt-1 flex flex-col ${
                  msg.sender_role === "admin" ? "items-end" : ""
                }`}
              >
                <p className="text-sm text-gray-500">
                  {msg.sender_role === "admin" ? "แอดมิน" : "ผู้ใช้"}
                </p>
                <div
                  className={`w-fit  mt-0.5 px-3 py-1 rounded-full ${
                    msg.sender_role === "admin" ? "bg-blue-300" : "bg-green-400"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="w-11/12 p-2"
              placeholder="พิมพ์ข้อความ..."
            />
            <button
              type="submit"
              className="bg-blue-400 py-2.5 px-4 ml-2 rounded-xl text-white cursor-pointer"
            >
              ส่ง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChatRoom;

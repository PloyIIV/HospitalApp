import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../contexts/authenContext";
import axios from "axios";

const Message = ({ id }) => {
  const { state, url } = useAuth();
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessage = async (roomId) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq('room_id', roomId)
      .order("created_at");
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !roomId) return;
    await supabase.from("messages").insert([
      {
        text: newMessage,
        sender_id: id,
        sender_role: "user",
        room_id: roomId,
        inserted_at: new Date(),
      },
    ]);
    setNewMessage("");
  };

  const subscribeToMessages = (roomId) => {
    const channel = supabase
      .channel("chat-room-" + roomId)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    return channel
  };

  useEffect(() => {
    const init = async () => {
      let { data: room } = await supabase.from('rooms').select('*').eq('user_id', state.id).single()
      if(!room) {
        const { data: newRoom } = await supabase.from('rooms').insert([{ user_id: state.id }]).select().single()
        room = newRoom
      }
      setRoomId(room.id)
      console.log(roomId)
      fetchMessage(room.id)
    }
    
    if(state?.id) init()
  }, [state?.id]);

  useEffect(() => {
    if(!roomId) return;
    const channel = subscribeToMessages(roomId)
    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  return (
    <div className="w-full bg-white/80 shadow-2xl mt-5 rounded-2xl px-10">
      <h1 className="py-4 text-center text-xl font-semibold">💬 Message</h1>
      <hr className="border-gray-300 mb-3" />
      <div className="max-h-[50vh] md:max-h-[70vh] overflow-auto">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`mt-1 flex flex-col ${
              msg.sender_role === "user" ? "items-end" : "items-start"
            }`}
          >
            <p className="text-sm text-gray-500">
              {msg.sender_role === "user" ? "คุณ" : "แอดมิน"}
            </p>
            <div className={`w-fit  mt-0.5 px-3 py-1 rounded-full ${
                    msg.sender_role === "user" ? "bg-blue-300" : "bg-green-400"
                  }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex py-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
  );
};

export default Message;

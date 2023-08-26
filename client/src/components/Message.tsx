import React, { useEffect, useState, useRef } from "react";
import ShowMessages from "./ShowMessages";
import { socket } from "../helpers";
import { toast } from "react-hot-toast";

type Foo = {
    message: string;
    username: string;
};

type User = {
    id: string;
    name: string;
    room: string;
};
export default function Message({
    room,
    username,
}: {
    room: string;
    username: string | null;
}) {
    const [messages, setMessages] = useState<Foo[]>([]);
    const [users, setUsers] = useState<User[] | null>(null);

    const messageRef = useRef<HTMLInputElement | null>(null);
    // const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        const newMessage = messageRef.current?.value || "";
        if (newMessage) {
            socket.emit("send-message", newMessage);
            if (messageRef.current) {
                messageRef.current.value = "";
            }
            // setMessages((prev) => [...prev, data]);
        }
    };

    useEffect(() => {
        socket.off().on("new-user", (data) => {
            toast.success(data);
        });

        socket.off().on("message", ({ user, text }) => {
            setMessages((prev) => [...prev, { username: user, message: text }]);
        });

        socket.on("users", (users: User[]) => {
            setUsers(users);
        });
        socket.emit("joined", { name: username, room });

        //here used off
        socket.off("receive-message").on("receive-message", (data) => {
            console.log("got message", data);
            setMessages((prev) => [...prev, data]);
        });
    }, [socket, room]);

    return (
        <>
            <ShowMessages
                messages={messages}
                room={room}
                users={users}
                username={username}
            />
            <div className="gap-2 w-full flex ">
                <input
                    type="text"
                    ref={messageRef}
                    placeholder="Enter Your message"
                    onKeyDown={(e) => {
                        return e.code == "Enter" ? handleSendMessage() : null;
                    }}
                    className="px-4 py-2 rounded-lg  bg-gray-700 text-white flex-1"
                />
                <button
                    className="px-4 py-2 bg-black text-white rounded-lg "
                    onClick={handleSendMessage}
                >
                    Enter
                </button>
            </div>
        </>
    );
}

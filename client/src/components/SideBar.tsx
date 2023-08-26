import { useEffect } from "react";
import { rooms } from "../helpers/constants";

export const RoomCard = ({ room, userRoom }: any) => {
    const element = document.getElementById("selectedRoom");
    useEffect(() => {
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, []);

    const handleChangeRoom = (room: string) => {
        localStorage.setItem("room", JSON.stringify(room));
        window.location.reload();
    };
    return (
        <div
            id={room.name == userRoom ? "selectedRoom" : ""}
            className={`cursor-pointer px-2 py-2   font-bold flex items-center gap-2 hover:bg-gray-900 
            hover:text-white
            ${
                room.name == userRoom
                    ? "bg-white text-black"
                    : "bg-sky-600 text-white"
            }  rounded-xl`}
            onClick={() => handleChangeRoom(room.name)}
        >
            <div className="font-bold">{room.icon}</div>
            <div className="">{room.name}</div>
        </div>
    );
};

export default function SideBar({ userRoom }: { userRoom: string | null }) {
    return (
        <div
            className="pl-4 gap-3 w-screen
             sm:w-fit sm:h-full h-fit flex 
          flex-row sm:flex-col px-1 py-1  rounded-md bg-sky-200 overflow-auto"
        >
            {rooms.map((room, index) => (
                <RoomCard
                    key={index}
                    room={room}
                    userRoom={userRoom}
                />
            ))}
        </div>
    );
}

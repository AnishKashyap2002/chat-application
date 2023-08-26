import { useEffect, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { AiOutlineUp } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";

type Foo = {
    username: string;
    message: string;
};

type User = {
    id: string;
    name: string;
    room: string;
};

type Props = {
    messages: Foo[];
    username: string | null;
    room: string | null;
    users: User[] | null;
};

const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("room");
    window.location.reload();
};

function ShowMessages({ messages, username, room, users }: Props) {
    const element = document.getElementById("scroll");

    const [isDown, setIsDown] = useState(false);

    useEffect(() => {
        element?.scrollIntoView();
    }, [messages]);

    return (
        <div className="bg-slate-50 px-4 py-2  rounded-md overflow-auto flex-1  flex flex-col shadow-lg w-full h-full ">
            <div className="font-bold text-2xl shadow-md text-white bg-gray-900 w-full  rounded flex justify-between items-center px-3 py-1">
                <div className=" flex gap-2 items-center">
                    <div className="">{room}</div>
                    <div className="relative">
                        <div
                            className={`text-lg font-extrabold cursor-pointer
                        ${
                            isDown
                                ? "rotate-180 transition ease-in-out"
                                : " rotate-0 transition ease-in-out"
                        } 
                        `}
                            onClick={() => setIsDown((prev) => !prev)}
                        >
                            {/* {isDown ? <AiOutlineDown /> : <AiOutlineUp />} */}
                            <AiOutlineUp />
                        </div>
                        {users && (
                            <div
                                className={`absolute flex transition origin-top flex-col bg-white rounded-md px-2 py-1 gap-1 shadow-lg ${
                                    isDown ? "scale-100" : "scale-0"
                                } `}
                            >
                                {users?.map((user, index) => (
                                    <div
                                        className={`bg-gray-700 text-white flex gap-2 items-center text-xl  
                                    px-2 py-1 rounded-md`}
                                        key={index}
                                    >
                                        <div className="">
                                            <BiSolidUserCircle />
                                        </div>
                                        <div className="">{user.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className=" flex gap-2 items-center">
                    <div className="bg-white rounded-md gap-2 flex items-center text-black px-2">
                        <BiSolidUserCircle />
                        <p>{username}</p>
                    </div>
                    <div
                        className=""
                        onClick={handleLogout}
                    >
                        <TbLogout />
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-2 mt-2 overflow-auto">
                {messages.map((message, index) => (
                    <div
                        className="w-full flex flex-col"
                        key={index}
                    >
                        <div
                            className={`${
                                message.username == username
                                    ? "self-end text-gray-700 pr-2"
                                    : "self-start text-gray-700 pl-2 "
                            } text-xs  w-fit`}
                        >
                            {message.username}
                        </div>
                        <div
                            className={`${
                                message.username == username
                                    ? "self-end bg-sky-500 text-white"
                                    : "float-left bg-slate-200 text-black"
                            }   px-4 py-2 rounded-2xl w-fit`}
                        >
                            <p className="chat">{message.message}</p>
                        </div>
                    </div>
                ))}
                <p
                    id="scroll"
                    className=""
                ></p>
            </div>
        </div>
    );
}

export default ShowMessages;

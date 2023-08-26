import { useEffect, useState } from "react";
import Message from "./components/Message";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
    const [room, setRoom] = useState<string>("React");
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const getUserName = localStorage.getItem("username");
        if (getUserName) {
            const userName = JSON.parse(getUserName);

            setUsername(userName);
            setLoggedIn(true);
        }
        const getRoom = localStorage.getItem("room");
        console.log(getRoom);
        if (getRoom) {
            setRoom(JSON.parse(getRoom));
        }
    }, []);

    return (
        <>
            <div className="flex items-center h-screen gap-2 flex-col ">
                {loggedIn && username ? (
                    <>
                        <div className=" h-full flex flex-col items-center">
                            <Header />
                            <div className="flex flex-col sm:flex-row h-full ">
                                <SideBar userRoom={room} />
                                <div className=" flex flex-col items-center min-w-full sm:min-w-[500px] md:min-w-[600px] xl:min-w-[800px] h-full  ">
                                    <Message
                                        room={room}
                                        username={username}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Login
                        setLoggedIn={setLoggedIn}
                        setUsername={setUsername}
                    />
                )}
                <Toaster />
            </div>
        </>
    );
}

export default App;

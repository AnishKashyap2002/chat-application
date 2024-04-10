import { useEffect, useState } from "react";
import { socket } from "../helpers";
import { toast } from "react-hot-toast";

const initialValues = {
    name: "",
    username: "",
    email: "",
};

export default function Login({
    setLoggedIn,
    setUsername,
}: {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const [isSignUp, setIsSignUp] = useState(true);
    const [form, setForm] = useState(initialValues);

    const changeType = () => {
        setIsSignUp((prev) => !prev);
        setForm(initialValues);
    };

    // const handleSignUp = (e: React.FormEvent) => {
    //     e.preventDefault();
    // };

    // const handleLogIn = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     localStorage.setItem("username", JSON.stringify(form.username));
    //     setLoggedIn(true);
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.username) {
            toast.error("Username is not given");
            return;
        }

        socket.emit("username-taken", form.username);
        console.log("Is is connected: ", socket.connected);
        socket.on("is-username-taken", ({ taken }) => {
            console.log(taken);
            if (taken) {
                toast.error("Username is already takne :(");
                return;
            } else {
                console.log("this is data", taken);
                toast.success("done");
                localStorage.setItem("username", JSON.stringify(form.username));
                setUsername(form.username);

                setTimeout(() => {
                    setLoggedIn(true);
                }, 1000);
                return;
            }
        });
        // localStorage.setItem("username", JSON.stringify(form.username));
        // setLoggedIn(true);
        // toast.success("done");
        // localStorage.setItem("username", JSON.stringify(form.username));
        // setUsername(form.username);
        // setTimeout(() => {
        //     setLoggedIn(true);
        // }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newForm = { ...form, [e.target.name]: e.target.value };
        setForm(newForm);
    };

    useEffect(() => {
        socket.on("connection", () => {
            console.log("Connected To Server");
        });
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="sm:w-[600px] w-full flex flex-col gap-4">
                <form
                    className="bg-gray-600 text-white rounded-lg shadow-lg px-4 py-2 flex flex-col gap-2"
                    // onSubmit={() => (isSignUp ? handleSignUp : handleLogIn)}
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-2xl text-center ">
                        {isSignUp ? "Sign Up" : "Log In"}
                    </h1>
                    <div className="flex flex-col gap-1 px-2 ">
                        <label
                            htmlFor=""
                            className="font-bold"
                        >
                            Enter UserName
                        </label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="z-10 bg-slate-50  px-4 py-2 rounded-md text-black outline-green-600"
                        />
                    </div>
                    {isSignUp && (
                        <div className="flex flex-col gap-1 px-2 ">
                            <label
                                htmlFor=""
                                className="font-bold"
                            >
                                Enter Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="z-10 bg-slate-50  px-4 py-2 rounded-md text-black outline-green-600"
                            />
                        </div>
                    )}

                    {isSignUp && (
                        <div className="flex flex-col gap-1 px-2 ">
                            <label
                                htmlFor=""
                                className="font-bold"
                            >
                                Enter Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="z-10 bg-slate-50  px-4 py-2 rounded-md text-black outline-green-600"
                            />
                        </div>
                    )}

                    <button
                        className="bg-white text-black mt-4 px-4 py-2 rounded-lg font-bold w-fit"
                        // onClick={() => (isSignUp ? handleSignUp : handleLogIn)}

                        type="submit"
                    >
                        {`${isSignUp ? "Sign Up" : "Log In"}`}
                    </button>

                    {isSignUp ? (
                        <p className="text-white w-full flex gap-2 justify-center cursor-pointer">
                            Already have an account ?
                            <span
                                className="font-bold"
                                onClick={changeType}
                            >
                                Log In
                            </span>
                        </p>
                    ) : (
                        <p className="text-white w-full flex gap-2 justify-center cursor-pointer">
                            Don't have an account ?
                            <span
                                className="font-bold"
                                onClick={changeType}
                            >
                                Sign Up
                            </span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

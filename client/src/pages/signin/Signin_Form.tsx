import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signin_Form() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Load saved username & password when component mounts
    useEffect(() => {
        const savedUsername = localStorage.getItem("rememberedUsername");
        const savedPassword = localStorage.getItem("rememberedPassword");

        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/signin/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", data.access); // Store token
                
                // Always update local storage based on checkbox state
                if (rememberMe) {
                    localStorage.setItem("rememberedUsername", username);
                    localStorage.setItem("rememberedPassword", password);
                } else {
                    localStorage.removeItem("rememberedUsername");
                    localStorage.removeItem("rememberedPassword");
                }
                
                login(data.accessToken, data.refreshToken);
<<<<<<< HEAD
                navigate("/"); // Redirect to dashboard
=======
                navigate("/main"); 
>>>>>>> 03a1e69c441f23abf87fc1b19b671f5abf9596f6
            } else {
                setErrorMessage(data.error || "Đăng nhập thất bại!");
            }
        } catch (error) {
            setErrorMessage("Lỗi kết nối đến máy chủ!");
        }
    };

    return (
        <div className="font-barlow-condensed">
            <h1 className="text-7xl font-bold text-white text-center"> ĐĂNG NHẬP </h1>

            {errorMessage && (
                <p className="text-red-500 text-center text-xl font-medium mt-4">{errorMessage}</p>
            )}

            <form className="mt-8 w-[500px]" onSubmit={handleLogin}>
                <div>
                    <label className="text-xl font-semibold text-white">Username</label>
                    <input
                        type="text"
                        className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                        placeholder="Nhập username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="text-xl font-semibold text-white">Mật khẩu</label>
                    <input
                        type="password"
                        className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe} // Ensure checkbox state is bound
                            onChange={(e) => setRememberMe(e.target.checked)} // Update state on change
                        />
                        <label className="ml-2 font-medium text-base text-white" htmlFor="remember">
                            Ghi nhớ mật khẩu
                        </label>
                    </div>
                    <Link
                        to="/forget-password"
                        className="font-medium text-base text-gray-100 hover:underline"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                <div className="mt-8 flex flex-col">
                    <button
                        type="submit"
                        className="hover:opacity-90 transition-opacity py-3 rounded-3xl bg-gradient-to-b from-linear-1 to-linear-2 text-white text-xl font-medium"
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}
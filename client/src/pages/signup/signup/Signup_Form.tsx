import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp_Form() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
    
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu xác minh không khớp!");
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/sign-up-verification/');  // Redirect to waiting page
            } else {
                setError(data.error || "Đăng ký thất bại, vui lòng thử lại.");
            }
        } catch (error) {
            setError("Lỗi kết nối, vui lòng thử lại.");
        }
    };

    return (
        <div className="flex font-barlow-condensed mt-8">
            {/* Form Container */}
            <div className="flex-1 p-8">
                <h1 className="text-7xl font-bold text-white text-center">ĐĂNG KÍ</h1>
                {error && <p className="text-red text-center text-xl font-medium mt-4">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-8 w-[500px]">
                    <div>
                        <label className="text-xl text-semibold text-white">Tên người dùng</label>
                        <input
                            type="text"
                            name="username"
                            className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                            placeholder="Nhập tên người dùng"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-xl text-semibold text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                            placeholder="Nhập tài khoản email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-xl text-semibold text-white">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-xl text-semibold text-white">Xác minh mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border-2 border-gray-100 rounded-3xl p-4 mt-1 bg-transparent text-white focus:outline-none"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-4 flex justify-between items-center text-gray-200 text-xs">
                        <ul className="text-sm list-disc ml-5">
                            <li>Mật khẩu tối thiểu 8 ký tự.</li>
                            <li>Chữ in hoa (A-Z).</li>
                            <li>Chữ thường (a-z).</li>
                            <li>Số (0-9).</li>
                            <li>Ít nhất một ký tự đặc biệt (*, /, @, #, $).</li>
                        </ul>
                    </div>

                    <div className="mt-4 flex flex-col">
                        <button
                            type="submit"
                            className="py-3 rounded-3xl bg-gradient-to-b from-linear-1 to-linear-2 text-white text-xl font-medium text-center hover:opacity-90 transition-opacity"
                        >
                            Đăng kí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp_Form;

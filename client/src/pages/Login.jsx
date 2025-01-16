import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://sensegrass-69dv.onrender.com/api/users/login", formData);
            console.log(response.data)
            const { role, token, ...userData } = response.data;

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('token', token);

            toast.success("Login successful!");

            if (role === 'admin') {
                navigate('/adminDashboard');
            } else if (role === 'farmer') {
                navigate('/farmerDashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bgImage">
            <div className="w-full max-w-lg bg-slate-900 shadow-lg rounded-lg p-8 z-10 bg-opacity-100">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Welcome to SenseGrass
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <LabelInputContainer>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </LabelInputContainer>

                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        type="submit"
                    >
                        Log In
                        <BottomGradient />
                    </button>
                </form>
            </div>
        </div>
    );
};

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default Login;

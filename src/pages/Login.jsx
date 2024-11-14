import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {loginRequest} from "../components/api/UserService";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await loginRequest(data);

            const token = response.data;
            localStorage.setItem("token", token);

            navigate("/");
        } catch (err) {
            console.log(err.response ? err.response.data : "Login failed");
            setError(err.response ? err.response.data : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className={`border p-2 w-full rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className={`border p-2 w-full rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 text-white font-semibold rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </form>

            {/* Register Button */}
            <div className="mt-4">
                <button
                    onClick={() => navigate("/register")}
                    className="text-blue-500 hover:underline"
                >
                    Don't have an account? Register here.
                </button>
            </div>
        </div>
    );
}

export default Login;

import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getCurrentUserRequest} from "./api/UserService";

function Header() {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

    useEffect(  () => {
        const fetchCurrentUser = async () => {
            try {
                const response = await getCurrentUserRequest();

                setUsername(response.data.username);
            } catch (err) {
                console.log("Failed to fetch user");
            }
        };

        fetchCurrentUser().then();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <header className="w-full bg-blue-600 p-5 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">Welcome, {username ? username : "guest"}</h1>
                    <nav>
                        <ul className="flex space-x-8">
                            <li>
                                <Link to="/"
                                      className="text-white hover:text-blue-300 transition duration-200">Workers</Link>
                            </li>
                            <li>
                                <Link to="/file-import"
                                      className="text-white hover:text-blue-300 transition duration-200">File
                                    Import</Link>
                            </li>
                            <li>
                                <Link to="/file-import-history"
                                      className="text-white hover:text-blue-300 transition duration-200">File
                                    Import History</Link>
                            </li>
                            <li>
                                <Link to="/special-interface"
                                      className="text-white hover:text-blue-300 transition duration-200">Special
                                    Interface</Link>
                            </li>
                            <li>
                                <Link to="/admin-requests"
                                      className="text-white hover:text-blue-300 transition duration-200">Admin
                                    Requests</Link>
                            </li>
                        </ul>
                    </nav>
                    {username ?
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
                        >
                            Log out
                        </button>
                        :
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300"
                        >
                            Log in
                        </button>
                    }
                </div>
            </header>
        </>
    );
}

export default Header;

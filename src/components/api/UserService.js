import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/users';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/users';
export const getCurrentUserRequest = async () => {
    const token = localStorage.getItem("token");

    if (!token)
        return;
    return await axios.get(`${API_URL}/me`, {
        headers: {
            Authorization: `${token}`,
        },
    });
}

export const registerRequest = async (data) => {
    return await axios.post(
        `${API_URL}/register`, {
            username: data.username,
            password: data.password
        },
    );
}

export const loginRequest = async (data) => {
    return await axios.post(
        `${API_URL}/login`, {
            username: data.username,
            password: data.password
        },
    );
}
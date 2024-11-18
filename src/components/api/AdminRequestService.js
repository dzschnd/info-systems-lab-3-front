import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/admin-requests';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/admin-requests';

export const getPendingAdminRequests = async () => {
    const token = localStorage.getItem("token");

    if (token)
        return await axios.get(`${API_URL}/pending`, {
            headers: {
                Authorization: `${token}`,
            },
        });
}

export const createAdminRequest = async () => {
    const token = localStorage.getItem("token");

    if (token)
        await axios.post(`${API_URL}/request`, {}, {
            headers: {
                Authorization: `${token}`,
            },
        });
}

export const approveAdminRequest = async (requestId) => {
    const token = localStorage.getItem("token");

    if (token)
        await axios.post(`${API_URL}/${requestId}/approve`, {}, {
            headers: {
                Authorization: `${token}`,
            },
        });
}

export const rejectAdminRequest = async (requestId) => {
    const token = localStorage.getItem("token");

    await axios.post(`${API_URL}/${requestId}/reject`, {}, {
        headers: {
            Authorization: `${token}`,
        },
    });
}

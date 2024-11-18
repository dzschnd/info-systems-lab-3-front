import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/organizations';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/organizations';

export const getAllOrganizationsRequest = async () => {
    const token = localStorage.getItem("token");

    if (token) {
        return await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `${token}`
            },
        });
    }

    return [];
}

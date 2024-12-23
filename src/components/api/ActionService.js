import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/admin-requests';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/actions';

export const getFileImportActions = async () => {
    const token = localStorage.getItem("token");

    if (token)
        return await axios.get(`${API_URL}/from-file-import`, {
            headers: {
                Authorization: `${token}`,
            },
        });
}
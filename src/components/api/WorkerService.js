import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/workers';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/workers';

export const importWorkersRequest = async (formData) => {
    const token = localStorage.getItem("token");

    if (token) {
        return await axios.post(`${API_URL}/from-file-import`, formData, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export const createWorkerRequest = async (worker, fromFileImport = false) => {
    const token = localStorage.getItem("token");

    if (token) {
        return await axios.post(API_URL, worker, {
            headers: {
                Authorization: `${token}`,
            },
        });
    }
};

export const updateWorkerRequest = async (worker, fromFileImport = false) => {
    const token = localStorage.getItem("token");

    if (token)
        return await axios.put(`${API_URL}/${worker.id}`, worker, {
            headers: {
                Authorization: `${token}`,
            },
        });
}

export const deleteWorkerRequest = async (workerId) => {
    const token = localStorage.getItem("token");

    if (token)
        return await axios.delete(`${API_URL}/${workerId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
}

export const getAllWorkersRequest = async () => {
    return await axios.get(API_URL);
}
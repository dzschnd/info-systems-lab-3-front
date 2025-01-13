import axios from "axios";

// const API_URL = 'http://localhost:7727/is-lab-1/api/admin-requests';
const API_URL = 'http://localhost:8080/info-systems-lab-1-1.0-SNAPSHOT/api/file-imports';

export const getFileImports = async () => {
    const token = localStorage.getItem("token");

    if (token)
        return await axios.get(`${API_URL}/`, {
            headers: {
                Authorization: `${token}`,
            },
        });
}


export const downloadFile = async (actionId, fileName) => {
    const token = localStorage.getItem("token");

    if (token) {
        const storedFileName = fileName.replace(".json", "") + "--" + actionId + ".json";
        try {
            const response = await axios.get(`${API_URL}/download`, {
                params: { fileName: storedFileName },
                headers: {
                    Authorization: `${token}`,
                },
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            let suggestedFileName = storedFileName;

            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length > 1) {
                    suggestedFileName = fileNameMatch[1];
                }
            }

            const finalFileName = suggestedFileName.replace(/--\d+\.json$/, '.json');

            const blob = new Blob([response.data], { type: response.data.type });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = finalFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    }
};
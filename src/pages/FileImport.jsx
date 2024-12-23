import { useEffect, useState } from "react";
import ErrorModal from "../components/modals/ErrorModal";
import Loader from "./Loader";
import { getCurrentUserRequest } from "../components/api/UserService";
import { createWorkerRequest, updateWorkerRequest, importWorkersRequest } from "../components/api/WorkerService";

function FileImport() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [file, setFile] = useState(null);
    const [operationLoading, setOperationLoading] = useState(false);
    const [editRecordId, setEditRecordId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [processedWorkersCount, setProcessedWorkersCount] = useState(0);
    const [totalWorkersCount, setTotalWorkersCount] = useState(0);

    const fetchUserData = async () => {
        try {
            const response = await getCurrentUserRequest();
            setCurrentUser(response.data);
            if (response.data.role === "ADMIN") {
                setIsAdmin(true);
            }
        } catch (err) {
            console.error("Error fetching current user:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (error) setIsErrorModalOpen(true);
    }, [error]);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);

            setFileContent(null);
            const reader = new FileReader();

            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    setFileContent(jsonData);
                } catch (error) {
                    setError("Invalid JSON file.");
                }
            };

            reader.onerror = () => {
                setError("Error reading the file.");
            };

            reader.readAsText(file);
        }
    };

    const handleWorkersFromFile = async () => {
        setProcessing(true);

        if (!file) {
            console.error("File is not selected.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("File sent");
            console.log(fileContent);
            const response = await importWorkersRequest(formData);
            console.log(response.data);
        } catch (err) {
            console.error("Error response:", err.response);
            const validationErrors = err.response?.data?.ValidationErrors;
            if (validationErrors) {
                const formattedErrors = Object.keys(validationErrors)
                    .map((field) => `${field}: ${validationErrors[field].join(", ")}`)
                    .join("\n");
                setError(formattedErrors);
            } else {
                setError(err.response?.data || err.message || "An error occurred");
            }
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">File Import</h1>
            {isErrorModalOpen && error && (
                <ErrorModal
                    onClose={() => {
                        setIsErrorModalOpen(false);
                        setError(null);
                    }}
                    message={error}
                />
            )}

            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md mt-4">
                <input
                    type="file"
                    accept="application/json"
                    onChange={onFileChange}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md"
                />
            </div>

            {fileContent && (
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-xl font-semibold">Imported JSON Data:</h2>
                            <pre className="bg-gray-200 p-4 rounded">
                                {JSON.stringify(fileContent, null, 2)}
                            </pre>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleWorkersFromFile}
                                className={`text-white bg-blue-500 p-2 mb-2 rounded hover:bg-blue-600 transition duration-300 shadow-md ${
                                    operationLoading || processing ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={operationLoading || processing}
                            >
                                {operationLoading || processing ? "Loading..." : "Create/Edit Worker(s)"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileImport;

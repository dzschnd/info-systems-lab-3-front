import { useEffect, useState } from "react";
import ErrorModal from "../components/modals/ErrorModal";
import Loader from "./Loader";
import FileImportHistoryTable from "../components/FileImportHistoryTable";
import { getCurrentUserRequest } from "../components/api/UserService";
import { getFileImports } from "../components/api/FileImportService";
import ForbiddenSectionPanel from "../components/ForbiddenSectionPanel";

function FileImportHistory() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [fileImportHistory, setFileImportHistory] = useState([]);

    // Fetch current user data
    const fetchUserData = async () => {
        try {
            const response = await getCurrentUserRequest();
            setCurrentUser(response.data);
        } catch (err) {
            console.error('Error fetching current user:', err);
            setError('Failed to fetch user data.');
        }
    };

    useEffect(() => {
        fetchUserData().then(() => setLoading(false));
    }, []);

    // Fetch file import actions
    useEffect(() => {
        const fetchFileImportActions = async () => {
            try {
                if (currentUser) {
                    const response = await getFileImports();
                    setFileImportHistory(response.data);
                }
            } catch (err) {
                console.error('Error fetching file import actions:', err);
                setError('Failed to fetch file import actions.');
            }
        };

        if (currentUser) {
            fetchFileImportActions();
        }

        const intervalId = setInterval(() => {
            if (currentUser) {
                fetchFileImportActions();
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [currentUser]);

    useEffect(() => {
        if (error) setIsErrorModalOpen(true);
    }, [error]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">File Import History</h1>

            {/* Error Modal */}
            {isErrorModalOpen && error && (
                <ErrorModal
                    onClose={() => {
                        setIsErrorModalOpen(false);
                        setError(null);
                    }}
                    message={error}
                />
            )}

            {/* Display file import history */}
            {currentUser ? (
                // Show file import history or a message if empty
                fileImportHistory.length > 0 ? (
                    <FileImportHistoryTable fileImportHistory={fileImportHistory} />
                ) : (
                    <p>No file import history available.</p>
                )
            ) : (
                // If there's no current user, show forbidden access or login message
                <ForbiddenSectionPanel />
            )}
        </div>
    );
}

export default FileImportHistory;

import { useEffect, useState } from "react";
import ErrorModal from "../components/modals/ErrorModal";
import Loader from "./Loader";
import FileImportHistoryTable from "../components/FileImportHistoryTable";
import AdminRequestsPanel from "../components/AdminRequestsPanel";
import { getCurrentUserRequest } from "../components/api/UserService";
import { getFileImportActions } from "../components/api/ActionService";
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
                    const response = await getFileImportActions();
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
            {isErrorModalOpen && error && (
                <ErrorModal
                    onClose={() => {
                        setIsErrorModalOpen(false);
                        setError(null);
                    }}
                    message={error}
                />
            )}
            {currentUser ? (
                <FileImportHistoryTable fileImportHistory={fileImportHistory} />
            ) : (
                <ForbiddenSectionPanel />
            )}
        </div>
    );
}

export default FileImportHistory;

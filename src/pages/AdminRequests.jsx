import {useEffect, useState} from "react";
import ErrorModal from "../components/modals/ErrorModal";
import Loader from "./Loader";
import AdminRequestsTable from "../components/AdminRequestsTable";
import AdminRequestsPanel from "../components/AdminRequestsPanel";
import {getCurrentUserRequest} from "../components/api/UserService";
import {
    approveAdminRequest,
    createAdminRequest,
    getPendingAdminRequests,
    rejectAdminRequest
} from "../components/api/AdminRequestService";
import ForbiddenSectionPanel from "../components/ForbiddenSectionPanel";

function AdminRequests() {
    const [adminRequests, setAdminRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [requestSubmitted, setRequestSubmitted] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await getCurrentUserRequest();

            setCurrentUser(response.data);
            if (response.data.role === "ADMIN") {
                setIsAdmin(true);
            }
        } catch (err) {
            console.error('Error fetching current user:', err);
        }
    };

    useEffect(() => {
        fetchUserData().then(() => setLoading(false));
    }, []);

    useEffect(() => {
        const fetchAdminRequests = async () => {
            try {
                if (currentUser && isAdmin) {
                    const response = await getPendingAdminRequests();
                    setAdminRequests(response.data);
                }
            } catch (err) {
                console.error('Error fetching admin requests:', err);
            }
        };

        const intervalId = setInterval(() => {
            fetchAdminRequests().then();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [currentUser, isAdmin]);

    useEffect(() => {
        if (error) setIsErrorModalOpen(true);
    }, [error]);

    const handleRequestAdmin = async () => {
        try {
            await createAdminRequest();
            setRequestSubmitted(true);
        } catch (err) {
            console.error(err);
        }
    };

    const approveRequest = async (requestId) => {
        try {
            await approveAdminRequest(requestId)
            setAdminRequests((prev) => prev.filter(req => req.id !== requestId));
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        }
    };

    const rejectRequest = async (requestId) => {
        try {
            await rejectAdminRequest(requestId);
            setAdminRequests((prev) => prev.filter(req => req.id !== requestId));
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        }
    };

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Requests</h1>
            {isErrorModalOpen && error && (
                <ErrorModal onClose={() => {
                    setIsErrorModalOpen(false);
                    setError(null);
                }} message={error}/>
            )}
            {(currentUser && isAdmin) ? (
                <>
                    <AdminRequestsTable
                        adminRequests={adminRequests}
                        approveRequest={approveRequest}
                        rejectRequest={rejectRequest}
                    />
                </>
            ) : currentUser ? (
                <AdminRequestsPanel
                    handleRequestAdmin={handleRequestAdmin}
                    requestSubmitted={requestSubmitted}
                />
            ) : (
                <ForbiddenSectionPanel/>
            )}
        </div>
    );
}

export default AdminRequests;

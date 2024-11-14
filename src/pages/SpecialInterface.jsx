import React, {useEffect, useState} from 'react';
import ErrorModal from "../components/modals/ErrorModal";
import {formatDateArrayToInputValue} from "../utils/DataFormatter";
import Loader from "./Loader";
import {getAllOrganizationsRequest} from "../components/api/OrganizationService";
import {deleteWorkerRequest, getAllWorkersRequest, updateWorkerRequest} from "../components/api/WorkerService";
import DeleteModal from "../components/modals/DeleteModal";
import {getCurrentUserRequest} from "../components/api/UserService";
import ForbiddenSectionPanel from "../components/ForbiddenSectionPanel";

const SpecialInterface = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [workers, setWorkers] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [operationLoading, setOperationLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [endDate, setEndDate] = useState('');
    const [namePrefix, setNamePrefix] = useState('');
    const [workersByPrefix, setWorkersByPrefix] = useState([]);
    const [workerByEndDate, setWorkerByEndDate] = useState(null);
    const [workerToHireId, setWorkerToHireId] = useState('');
    const [organizationToHireFullName, setOrganizationToHireFullName] = useState('');
    const [workerToTransferId, setWorkerToTransferId] = useState('');
    const [organizationToTransferFullName, setOrganizationToTransferFullName] = useState('');

    const [deleteByEndDateMessage, setDeleteByEndDateMessage] = useState('');
    const [deleteByEndDateError, setDeleteByEndDateError] = useState('');
    const [totalRating, setTotalRating] = useState(null);
    const [hireMessage, setHireMessage] = useState('');
    const [hireError, setHireError] = useState('');
    const [transferMessage, setTransferMessage] = useState('');
    const [transferError, setTransferError] = useState('');

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await getAllWorkersRequest();
                setWorkers(response.data);
            } catch (err) {
                setError(err.response?.data || err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        const fetchOrganizations = async () => {
            try {
                const response = await getAllOrganizationsRequest();

                setOrganizations(response.data);
            } catch (err) {
                setError(err.response?.data || err.message || "An error occurred");
            }
        };

        fetchWorkers().then();
        fetchOrganizations().then();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getCurrentUserRequest();

                setCurrentUser(response.data);
                if (response.data.role === "ADMIN") {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData().then();
    }, []);

    useEffect(() => {
        if (namePrefix.trim() === '') {
            setWorkersByPrefix([]);
        } else {
            const filteredWorkers = workers.filter(worker =>
                worker.name.toLowerCase().startsWith(namePrefix.toLowerCase())
            );
            setWorkersByPrefix(filteredWorkers);
        }
    }, [namePrefix, workers]);

    const updateWorker = async (formData) => {
        try {
            await updateWorkerRequest(formData);
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        }
    };
    const deleteWorker = async (id) => {
        try {
            setOperationLoading(true);
            await deleteWorkerRequest(id);
            setWorkers((prev) => prev.filter(worker => worker.id !== id));
            setDeleteByEndDateMessage('Worker deleted successfully');
            setDeleteByEndDateError('');
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        } finally {
            setIsDeleteModalOpen(false);
            setOperationLoading(false);
        }
    };
    const handleDeleteByEndDate = async () => {
        const workerByEndDate = workers.find(worker => formatDateArrayToInputValue(worker.endDate) === endDate);
        if (workerByEndDate) {
            setWorkerByEndDate(workerByEndDate);
            setIsDeleteModalOpen(true);
        } else {
            setDeleteByEndDateMessage('');
            setDeleteByEndDateError('No workers found for specified end date');
        }
    };

    const handleCalculateTotalRating = async () => {
        let totalRating = workers.reduce((acc, worker) => acc + (worker.rating || 0), 0);
        setTotalRating(totalRating);
    };

    const handleHireWorker = async () => {
        if (workerToHireId === '' || organizationToHireFullName === '') {
            setHireError('Please specify both worker id and organization full name');
            return;
        }
        console.log(workers);
        console.log(organizations);
        const workerToTransfer = workers.find(worker => worker.id === Number(workerToHireId));
        const organizationToTransfer = organizations.find(org => org.fullName === organizationToHireFullName);

        if (workerToTransfer && organizationToTransfer) {
            const request = {
                ...workerToTransfer,
                organization: {
                    ...organizationToTransfer
                },
                status: 'HIRED'
            }
            await updateWorker(request);
            setHireMessage('Worker hired successfully');
            setHireError('');
        } else {
            setHireMessage('');
            if (!workerToTransfer)
                setHireError('Worker not found');
            if (!organizationToTransfer)
                setHireError('Organization not found');
        }
    };

    const handleTransferWorker = async () => {
        if (workerToTransferId === '' || organizationToTransferFullName === '') {
            setTransferError('Please specify both worker id and organization full name');
            return;
        }
       const workerToTransfer = workers.find(worker => worker.id === Number(workerToTransferId));
       const organizationToTransfer = organizations.find(org => org.fullName === organizationToTransferFullName);

        if (workerToTransfer && organizationToTransfer) {
            const request = {
                ...workerToTransfer,
                organization: {
                    ...organizationToTransfer
                }
            }
            await updateWorker(request);
            setTransferMessage('Worker transferred successfully');
            setTransferError('');
        } else {
            setTransferMessage('');
            if (!workerToTransfer)
                setTransferError('Worker not found');
            if (!organizationToTransfer)
                setTransferError('Organization not found');
        }
    };

    useEffect(() => {
        if (error) setIsErrorModalOpen(true);
    }, [error]);

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Special Operations</h1>
            { (currentUser && isAdmin) ? (
                <>
                    {isErrorModalOpen && error && (
                        <ErrorModal onClose={() => {
                            setIsErrorModalOpen(false);
                            setError(null);
                        }} message={error} />
                    )}
                    {isDeleteModalOpen && workerByEndDate && (
                        <DeleteModal
                            onClose={() => {
                                setIsDeleteModalOpen(false);
                            }}
                            onDelete={() => deleteWorker(workerByEndDate.id)}
                            recordId={workerByEndDate.id}
                            loading={operationLoading}
                        />
                    )}

                    {/* Delete Worker by End Date */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Delete Worker by End Date</h2>
                        <input
                            type="date"
                            className="border p-2 mt-2 rounded-md"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            onClick={handleDeleteByEndDate}
                            className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Delete Worker
                        </button>
                        {deleteByEndDateMessage !== '' && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-green-600">{deleteByEndDateMessage}</p>
                                <button onClick={() => setDeleteByEndDateMessage('')}>x</button>
                            </div>
                        )}
                        {deleteByEndDateError !== '' && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-red-600">{deleteByEndDateError}</p>
                                <button onClick={() => setDeleteByEndDateError('')}>x</button>
                            </div>
                        )}
                    </div>

                    {/* Calculate Total Rating */}
                    <div className="mb-4">
                            <h2 className="text-xl font-semibold">Calculate Total Rating</h2>
                            <button
                            onClick={handleCalculateTotalRating}
                         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Calculate
                    </button>
                    {totalRating !== null && (
                        <div className={'flex gap-2'}>
                                <p className="mt-2 text-green-600">Total Rating: {totalRating}</p>
                                <button onClick={() => setTotalRating(null)}>(x)</button>
                            </div>
                        )}
                    </div>

                    {/* Find Workers by Name Prefix */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Find Workers by Name Prefix</h2>
                        <input
                            type="text"
                            className="border p-2 mt-2 rounded-md"
                            placeholder="Enter prefix"
                            value={namePrefix}
                            onChange={(e) => setNamePrefix(e.target.value)}
                        />
                        {workersByPrefix.length > 0 && (
                            <ul className="mt-2">
                                {workersByPrefix.map((worker) => (
                                    <li key={worker.id} className="text-green-600">{worker.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Hire Worker */}
                    <div className="mb-4">
                    <h2 className="text-xl font-semibold">Hire Worker</h2>
                        <input
                            type="number"
                            className="border p-2 mt-2 rounded-md"
                            placeholder="Worker ID"
                            value={workerToHireId}
                            onChange={(e) => setWorkerToHireId(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border p-2 mt-2 rounded-md ml-2"
                            placeholder="Organization Full Name"
                            value={organizationToHireFullName}
                            onChange={(e) => setOrganizationToHireFullName(e.target.value)}
                        />
                        <button
                            onClick={handleHireWorker}
                            className="ml-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Hire Worker
                        </button>
                        {hireMessage && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-green-600">{hireMessage}</p>
                                <button onClick={() => setHireMessage('')}>(x)</button>
                            </div>
                        )}
                        {hireError && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-red-600">{hireError}</p>
                                <button onClick={() => setHireError('')}>(x)</button>
                            </div>
                        )}
                    </div>

                    {/* Transfer Worker */}
                    <div className="mb-4">
                            <h2 className="text-xl font-semibold">Transfer Worker</h2>
                            <input
                            type="number"
                            className="border p-2 mt-2 rounded-md"
                            placeholder="Worker ID"
                            value={workerToTransferId}
                         onChange={(e) => setWorkerToTransferId(e.target.value)}
                    />
                    <input
                        type="text"
                        className="border p-2 mt-2 rounded-md ml-2"
                            placeholder="Organization Full Name"
                            value={organizationToTransferFullName}
                            onChange={(e) => setOrganizationToTransferFullName(e.target.value)}
                        />
                        <button
                            onClick={handleTransferWorker}
                            className="ml-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        >
                            Transfer Worker
                        </button>
                        {transferMessage && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-green-600">{transferMessage}</p>
                                <button onClick={() => setTransferMessage('')}>(x)</button>
                            </div>
                        )}
                        {transferError && (
                            <div className={'flex gap-2'}>
                                <p className="mt-2 text-red-600">{transferError}</p>
                                <button onClick={() => setTransferError('')}>(x)</button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <ForbiddenSectionPanel/>
            )}
        </div>
    );
};

export default SpecialInterface;

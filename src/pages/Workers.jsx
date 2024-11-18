import { useEffect, useState } from "react";
import ErrorModal from "../components/modals/ErrorModal";
import CreateModal from "../components/modals/CreateModal";
import UpdateModal from "../components/modals/UpdateModal";
import DeleteModal from "../components/modals/DeleteModal";
import Loader from "./Loader";
import WorkersTable from "../components/WorkersTable";
import {
    deleteWorkerRequest,
    getAllWorkersRequest,
    createWorkerRequest,
    updateWorkerRequest
} from "../components/api/WorkerService";
import {getCurrentUserRequest} from "../components/api/UserService";
import {getAllCoordinatesRequest} from "../components/api/CoordinatesService";
import {getAllOrganizationsRequest} from "../components/api/OrganizationService";
import {getAllPersonsRequest} from "../components/api/PersonService";

function Workers() {
    const [workers, setWorkers] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [persons, setPersons] = useState([]);

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [operationLoading, setOperationLoading] = useState(false);

    const [error, setError] = useState(null);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [record, setRecord] = useState({
        id: null,
        name: null,
        coordinates: { x: null, y: null },
        creationDate: null,
        organization: {
            officialAddress: {
                street: null,
                zipCode: null,
                town: { x: null, y: null, z: null, name: null }
            },
            annualTurnover: null,
            employeesCount: null,
            fullName: null,
            type: null
        },
        salary: null,
        rating: null,
        startDate: null,
        endDate: null,
        status: null,
        person: {
            eyeColor: null,
            hairColor: null,
            location: { x: null, y: null, z: null, name: null },
            birthday: null,
            height: null,
            passportID: null
        }
    });
    const resetRecord = () => {
        setRecord({
            id: null,
            name: null,
            coordinates: { x: null, y: null },
            creationDate: null,
            organization: {
                officialAddress: {
                    street: null,
                    zipCode: null,
                    town: { x: null, y: null, z: null, name: null }
                },
                annualTurnover: null,
                employeesCount: null,
                fullName: null,
                type: null
            },
            salary: null,
            rating: null,
            startDate: null,
            endDate: null,
            status: null,
            person: {
                eyeColor: null,
                hairColor: null,
                location: { x: null, y: null, z: null, name: null },
                birthday: null,
                height: null,
                passportID: null
            }
        });
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUserRequest();

                setCurrentUser(response.data);
            } catch (err) {
                console.log("Failed to fetch user");
            }
        }

        checkAuth().then();
    }, []);

    useEffect(() => {
        const fetchWorkers = async () => {
            const fetchedWorkers = await getAllWorkersRequest();
            setWorkers(fetchedWorkers.data);
        }

        const intervalId = setInterval(() => {
            fetchWorkers().then(() => setLoading(false));
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchModalData = async () => {
            const fetchedCoordinates = await getAllCoordinatesRequest();
            const fetchedOrganizations = await getAllOrganizationsRequest();
            const fetchedPersons = await getAllPersonsRequest();
            setCoordinates(fetchedCoordinates.data);
            setOrganizations(fetchedOrganizations.data);
            setPersons(fetchedPersons.data)
        }
        if (isCreateModalOpen || isUpdateModalOpen) {
            setOperationLoading(true);
            fetchModalData().then(() => setOperationLoading(false));
        }
    }, [isCreateModalOpen, isUpdateModalOpen]);


    useEffect(() => {
        if (error) setIsErrorModalOpen(true);
    }, [error]);

    const createWorker = async (formData) => {
        try {
            setOperationLoading(true);
            const response = await createWorkerRequest(formData);
            setWorkers((prev) => [...prev, response.data]);
            resetRecord();
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        } finally {
            setOperationLoading(false);
            setIsCreateModalOpen(false);
        }
    };

    const updateWorker = async (formData) => {
        try {
            setOperationLoading(true);
            const response = await updateWorkerRequest(formData)
            setWorkers((prev) => prev.map((worker) => (worker.id === formData.id ? response.data : worker)));
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        } finally {
            resetRecord();
            setOperationLoading(false);
            setIsUpdateModalOpen(false);
        }
    };

    const deleteWorker = async (id) => {
        try {
            setOperationLoading(true);
            await deleteWorkerRequest(id);
            setWorkers((prev) => prev.filter(worker => worker.id !== id));
            setIsDeleteModalOpen(false);
        } catch (err) {
            setError(err.response?.data || err.message || "An error occurred");
        } finally {
            setOperationLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Workers</h1>

            {isErrorModalOpen && error && (
                <ErrorModal onClose={() => {
                    setIsErrorModalOpen(false);
                    setError(null);
                }} message={error} />
            )}

            {isCreateModalOpen && (
                <CreateModal
                    onClose={() => { setIsCreateModalOpen(false); }}
                    onCreate={createWorker}
                    loading={operationLoading}
                    currentUser={currentUser}
                    workers={workers}
                    coordinates={coordinates}
                    organizations={organizations}
                    persons={persons}
                />
            )}

            {isUpdateModalOpen && (
                <UpdateModal
                    onClose={() => { setIsUpdateModalOpen(false); }}
                    onUpdate={updateWorker}
                    record={record}
                    loading={operationLoading}
                    currentUser={currentUser}
                    workers={workers}
                    coordinates={coordinates}
                    organizations={organizations}
                    persons={persons}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                    }}
                    onDelete={deleteWorker}
                    recordId={record.id}
                    loading={operationLoading}
                />
            )}

          <WorkersTable
              workers={workers}
              currentUser={currentUser}
              setRecord={setRecord}
              setIsCreateModalOpen={setIsCreateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
        </div>
    );
}

export default Workers;

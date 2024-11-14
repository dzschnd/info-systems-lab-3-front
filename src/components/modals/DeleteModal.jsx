const DeleteModal = ({ onClose, onDelete, recordId, loading }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h2 className="text-lg underline font-bold mb-2">Delete Record</h2>
                <p>Are you sure you want to delete the record with ID {recordId}?</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => {onDelete(recordId)}}
                        className={`${loading ? 'bg-gray-500' : 'bg-red-500'} text-white p-2 mr-2 rounded`} disabled={loading}>
                        {loading ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white p-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

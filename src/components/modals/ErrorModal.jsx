function ErrorModal({ message, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg w-1/3">
                <h2 className="text-lg font-bold mb-2">Error</h2>
                <p>{message}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;

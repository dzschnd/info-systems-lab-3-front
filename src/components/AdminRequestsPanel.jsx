const AdminRequestsPanel = ({ handleRequestAdmin, requestSubmitted }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md mt-4">
            {
                (requestSubmitted) ? (
                    <p className="text-green-600 font-semibold mt-2">Your request has been submitted!</p>
                ) : (
                    <button
                        onClick={handleRequestAdmin}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md"
                    >
                        Request Admin Access
                    </button>
                )
            }
        </div>
    )
}

export default AdminRequestsPanel;
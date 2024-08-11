
function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
                <img
                    src={'./src/images/Logo.jpeg'}
                    alt="EfodMagen Logo"
                    className="mx-auto mb-6 w-32 h-32 object-cover rounded-full border-4 border-gray-700"
                />
                <div className="text-3xl font-semibold mb-4">Loading...</div>
                <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-opacity-25 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            </div>
        </div>
    );
}

export default Loading;

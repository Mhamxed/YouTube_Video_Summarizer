export default function Feedback() {
    return (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-3">Was this helpful?</p>
            <div className="flex space-x-2">
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium">
                👍 Yes
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium">
                👎 No
                </button>
                <button className="ml-auto px-4 py-2 rounded-lg bg-lime-100 text-lime-700 hover:bg-lime-200 text-sm font-medium">
                Share
                </button>
            </div>
        </div>
    )
}
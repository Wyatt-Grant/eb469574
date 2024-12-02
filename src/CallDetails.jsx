import React from 'react';
import { useData } from './DataContext.jsx';

const CallDetails = ({ isOpen, callData }) => {
    const { updateActivityArchivedStatus } = useData();

    return (
    <div
    style={{
        transition: 'height 0.25s ease-in-out',
        height: isOpen ? "10rem" : "0"
      }}
    >
        <div 
        className="max-w-md mx-auto px-6"
        style={{
            transition: 'opacity 0.15s ease-in-out',
            opacity: isOpen ? "1" : "0",
            display: isOpen ? "block" : "none"
          }}
        >
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">From:</span>
                <span className="text-gray-800">{callData?.from}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">To:</span>
                <span className="text-gray-800">{callData?.to}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Via:</span>
                <span className="text-gray-800">{callData?.via}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Duration:</span>
                <span className="text-gray-800">{callData?.duration} seconds</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium text-gray-600">Created At:</span>
                <span className="text-gray-800">{new Date(callData?.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <button onClick={() => updateActivityArchivedStatus(callData.id, !callData.is_archived)} className="rounded-md bg-red-600 p-2 w-full mt-3 hover:bg-red-700 text-white active:scale-95 focus:outline-none transition-all duration-150">
                    {!callData.is_archived ? "Archive" : "Unarchive"}
                </button>
            </div>
        </div>
    </div>
    );
}

export default CallDetails;

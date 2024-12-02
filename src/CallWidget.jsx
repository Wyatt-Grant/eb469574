import React, { useState } from 'react';
import { BsFillTelephoneInboundFill, BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CallDetails from './CallDetails.jsx';
import { formatPhoneNumber, formatTime } from './Helpers.jsx';

const CallWidget = ({ activity }) => {
    const [open, setOpen] = useState(false);

    const isInBound = activity.direction === "inbound";
    const DirectionIcon = isInBound ? BsFillTelephoneInboundFill : BsFillTelephoneOutboundFill;
    const ExpandIcon = open ? MdExpandLess : MdExpandMore;

    return (
        <div className="my-4 flex-col bg-white rounded-xl drop-shadow-md max-w-lg mx-auto">
            <div className="flex items-center justify-between p-2">
                {/* Icon */}
                <DirectionIcon className={`${activity.call_type != "missed" ? "text-blue-500" : "text-red-400"} text-2xl w-2/12`} />

                {/* Phone Number and type */}
                <div className="flex flex-col space-y-1 w-6/12">
                    <span className="text-gray-800 text-md font-bold">{formatPhoneNumber(isInBound ? activity.from : activity.to)}</span>
                    <span className="text-gray-400 text-sm">{activity.call_type}</span>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-4 w-4/12 cursor-pointer" onClick={() => setOpen(!open)}>
                    <div className="border-l border-gray-300 h-10 mx-0" />
                    <span className="text-gray-600 text-sm select-none">{formatTime(activity.created_at)}</span>
                    <span className="text-gray-600 text-sm"><ExpandIcon /></span>
                </div>
            </div>
            <CallDetails callData={activity} isOpen={open} />
        </div>
    );
};

export default CallWidget;

import React, { useState } from 'react';
import { BsFillTelephoneInboundFill, BsFillTelephoneOutboundFill } from "react-icons/bs";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CallDetails from './CallDetails.jsx';


const CallWidget = ({ activity }) => {
    const [open, setOpen] = useState(false);

    const isInBound = activity.direction === "inbound";
    const statusText = isInBound ? "Inbound Call" : "Outbound Call";
    const DirectionIcon = isInBound ? BsFillTelephoneInboundFill : BsFillTelephoneOutboundFill;
    const ExpandIcon = open ? MdExpandLess : MdExpandMore;
  
    const formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return phoneNumberString;
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;
    };

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

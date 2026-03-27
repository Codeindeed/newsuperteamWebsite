import React from "react";
import { EventData } from "../data";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidVideo } from "react-icons/bi";
import { TbUserSquareRounded } from "react-icons/tb";

interface EventCardProps {
  event: EventData;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl flex flex-col gap-4 text-[#5F5F5F] hover:border-white/10 transition-colors">
      {/* Time */}
      <div className="text-[#5F5F5F] text-body-5 flex gap-2">
        <span>{event.timeRange}</span>
        <span>{event.timezone}</span>
      </div>

      {/* Title */}
      <h3 className="font-medium text-white text-body-3 pr-4">{event.title}</h3>

      {/* Meta data */}
      <div className="flex flex-col gap-2.5 text-body-5 mt-2 font-medium">
        <div className="flex items-center gap-2">
          {/* Mock logo */}
          <TbUserSquareRounded className="text-[18px] text-primary" />
          <span>{event.community}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 flex justify-center text-body-5">
            {event.type === "IRL" ? (
              <FaMapMarkerAlt className="text-white" size={14} />
            ) : (
              <BiSolidVideo className="text-white" size={14} />
            )}
          </div>
          <span>{event.type}</span>
        </div>
      </div>

      {/* Action */}
      <button className="w-full bg-grey-100 hover:bg-grey-80 transition-colors duration-700 hover:text-white text-body-5 font-medium text-[#5F5F5F] py-3.5 rounded-md mt-3 flex items-center justify-center">
        Register
      </button>
    </div>
  );
};

export default EventCard;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DAYS, dateFormatter } from "../helpers";
const timeSlots = ["FORENOON", "AFTERNOON"];

const DaySelector = () => {
  const { batchNo } = useParams();
  const [expandedDays, setExpandedDays] = useState({});
  const navigate = useNavigate();

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleTimeSlotClick = (day, time) => {
    navigate(`/attendance/${batchNo}/${day}/${time}`);
  };

  return (
    <div className="day-selector">
      <h1>Select a Day</h1>
      <ul className="list-group">
        {DAYS.map((day) => (
          <li key={day} className="list-group-item">
            <div onClick={() => toggleDay(day)} className="day-header">
              {dateFormatter.format(new Date(day))}
            </div>

            {expandedDays[day] && (
              <div
                className="timetable-wrapper"
                style={{
                  transition: "max-height 0.5s ease-in-out",
                  overflow: "hidden",
                }}
              >
                <div className="timetable">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="time-slot"
                      onClick={() => handleTimeSlotClick(day, time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DaySelector;

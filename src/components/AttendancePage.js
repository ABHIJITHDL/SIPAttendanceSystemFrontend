import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './AttendancePage.css';


const studentsData = {
  G1: [
    { name: 'A', department: 'CSE' },
    { name: 'B', department: 'ECE' },
    { name: 'C', department: 'EEE' },
    { name: 'D', department: 'ER' }
  ],
  G2: [
    { name: 'E', department: 'ME' },
    { name: 'F', department: 'CE' },
    { name: 'G', department: 'CHE' },
    { name: 'H', department: 'ARCH' }
  ],
  G3: [
    { name: 'I', department: 'CSE' },
    { name: 'J', department: 'ECE' },
    { name: 'K', department: 'EEE' },
    { name: 'L', department: 'ER' }
  ],
  G4: [
    { name: 'M', department: 'ME' },
    { name: 'N', department: 'CE' },
    { name: 'O', department: 'CHE' },
    { name: 'P', department: 'ARCH' }
  ]
};

const AttendancePage = () => {
  const { groupId, day, time } = useParams();

  console.log("Group ID:", groupId); // Check if this is correctly coming from URL


  // Memoize the students array to prevent recalculation on every render
  const students = useMemo(() => studentsData[groupId] || [], [groupId]);

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (students.length > 0) {
      setAttendance(students.map(student => ({ ...student, present: true })));
    }
  }, [students]);

  const toggleAttendance = (index) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].present = !updatedAttendance[index].present;
    setAttendance(updatedAttendance);
  };

  return (
    <div className="attendance-page">
      <h1>{groupId} - {day} - {time}</h1>

      {students.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student, index) => (
              <tr key={student.name}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>
                  <button
                    className={`btn ${student.present ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => toggleAttendance(index)}
                  >
                    {student.present ? 'Present' : 'Absent'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students available for {groupId}</p>
      )}
    </div>
  );
};

export default AttendancePage;
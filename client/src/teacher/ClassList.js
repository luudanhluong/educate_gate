// src/components/ClassList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/class/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Danh sách lớp</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            {classItem.preName} {classItem.suffName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;

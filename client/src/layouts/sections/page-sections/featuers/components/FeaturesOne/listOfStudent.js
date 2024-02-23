import React, { useState, useEffect } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useSelector } from "react-redux";
import "./studentList.css";
import { Icon } from "@mui/material";
const StudentsList = () => {
  const selectedClassId = useSelector((state) => state.classOnerTeacher.classId);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (selectedClassId) {
      axios
        .get(`http://localhost:9999/class/${selectedClassId}/students`)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching students for class:", error);
        });
    }
  }, [selectedClassId]);

  return (
    <MKBox px={3}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Group Name</th>
                  <th>Leader</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.email}>
                    <td>{student.username}</td>
                    <td>{student.email}</td>
                    <td>{student.isLeader ? <Icon>star</Icon> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </MKBox>
  );
};

export default StudentsList;

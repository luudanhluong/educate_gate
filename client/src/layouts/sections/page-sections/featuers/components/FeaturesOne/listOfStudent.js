import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import "./studentList.css";
import { Icon } from "@mui/material";
const StudentsList = () => {
  const { classStudent } = useSelector((state) => state.classOnerTeacher);
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
                {classStudent.length > 0
                  ? classStudent.map((student) => (
                      <tr key={student.email}>
                        <td>{student.username}</td>
                        <td>{student.email}</td>
                        <td>{student.isLeader ? <Icon>star</Icon> : ""}</td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </MKBox>
  );
};

export default StudentsList;

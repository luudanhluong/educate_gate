import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import "./studentList.css";
import { Icon } from "@mui/material";
const StudentsList = () => {
  const { classStudent } = useSelector((state) => state.classOnerTeacher);
  return (
    <MKBox pl={"25px"} pr={"5px"}>
      <Grid container>
        <Grid item xs={12}>
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr className="gradient-animated">
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Mã sinh viên</th>
                  <th>Nhóm trưởng</th>
                  <th>Tên nhóm</th>
                </tr>
              </thead>
              <tbody>
                {classStudent.length > 0 &&
                  classStudent.map((student) => (
                    <tr key={student._id}>
                      <td>{student.username}</td>
                      <td>{student.email}</td>
                      <td>{student.rollNumber}</td>
                      <td>
                        {student.isLeader ? (
                          <Icon sx={{ marginLeft: "8px", fontSize: "20px !important" }}>star</Icon>
                        ) : null}
                      </td>
                      <td>{student.groupName}</td>
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

import React from "react";
import MKTypography from "components/MKTypography";

const StudentList = () => {
  // Mảng giả định chứa thông tin học sinh
  const students = [
    { id: 1, name: "John Doe", DOB: "12/02/2002",gender:"male",majorOfStudent:1,classId:1,teacherId:1,groupId:1,semesterId:1 },
    { id: 2, name: "Jane Smith", DOB: "11/02/2002",gender:"male",majorOfStudent:1,classId:1,teacherId:1,groupId:1,semesterId:1},
    { id: 3, name: "Jane ", DOB: "17/02/2002",gender:"male",majorOfStudent:1,classId:1,teacherId:1,groupId:2,semesterId:1},
    // Thêm các thông tin học sinh khác nếu cần
  ];
const teachers = [

]
  return (
    <div>
      <MKTypography variant="h5" mb={3}>
        Student List
      </MKTypography>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <MKTypography variant="body1">
             
            </MKTypography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;

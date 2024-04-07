import React, { useEffect, useState } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import "./studentList.css";
import { Icon } from "@mui/material";
import CreateGroupModal from "./CreateGroupRandomModal";
import CreateGroupFromExcelPopup from "../CreateGroupUpFileModal";
import {
  setActivePopupCreateGroup,
  setActivePopupCreateGroupFromExcel,
} from "app/slices/activeSlice";
import getParams from "utilities/getParams";
import { useLocation } from "react-router-dom";
import { setClassId } from "app/slices/classOnerTeacherSlice";
import MKButton from "components/MKButton";

const StudentsList = () => {
  const dispatch = useDispatch();
  const url = useLocation();
  const classId = getParams(3, url.pathname);
  const classStudent = useSelector((state) => state.classOnerTeacher.classStudent);
  const { active_create_group, active_create_group_excel } = useSelector((state) => state.active);
  const [showCreateGroupButtons, setShowCreateGroupButtons] = useState(false);

  useEffect(() => {
    if (classId) {
      dispatch(setClassId(classId));
    }
  }, [classId, dispatch]);

  useEffect(() => {
    const allWithoutGroup =
      classStudent.length > 0 &&
      classStudent.every((student) => student.groupName === "Chưa có nhóm");
    setShowCreateGroupButtons(allWithoutGroup);
  }, [classStudent]);

  const handleRandomGroup = () => {
    dispatch(setActivePopupCreateGroup(true));
  };

  const handleExcelGroup = () => {
    dispatch(setActivePopupCreateGroupFromExcel(true));
  };

  return (
    <MKBox pl={"25px"} pr={"5px"}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {showCreateGroupButtons && (
            <>
              <MKBox px={"14px"} my={1} display="flex" justifyContent="end" gap="1.5rem">
                <MKButton onClick={handleRandomGroup}>Tạo Nhóm Ngẫu Nhiên</MKButton>
                <MKButton onClick={handleExcelGroup}>Tạo Nhóm Bằng Excel</MKButton>
              </MKBox>
            </>
          )}
          {active_create_group && <CreateGroupModal />}
          {active_create_group_excel && <CreateGroupFromExcelPopup />}
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
                {Object.values(classStudent).length > 0 &&
                  Object.values(classStudent).map((student) => (
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

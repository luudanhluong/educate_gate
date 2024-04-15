import { useEffect, useState } from "react";
import {
  setActivePopupCreateGroupFromExcel,
  setActivePopupCreateGroup,
} from "app/slices/activeSlice";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import Tables from "layouts/tables/user-list-table";
import CreateGroupModal from "layouts/sections/featuers/components/FeaturesOne/CreateGroupRandomModal";
import CreateGroupFromExcelPopup from "layouts/sections/featuers/components/CreateGroupUpFileModal";
import { setClassId } from "app/slices/classOnerTeacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import getParams from "utilities/getParams";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

const ListOfStudent = () => {
  const dispatch = useDispatch();
  const url = useLocation();
  const classId = getParams(3, url.pathname);
  const { active_create_group, active_create_group_excel } = useSelector((state) => state.active);
  const [showCreateGroupButtons, setShowCreateGroupButtons] = useState(false);

  const handleRandomGroup = () => {
    dispatch(setActivePopupCreateGroup(true));
  };

  const handleExcelGroup = () => {
    dispatch(setActivePopupCreateGroupFromExcel(true));
  };
  const classStudent = useSelector((state) => state.user.users);

  useEffect(() => {
    if (classId) {
      dispatch(setClassId(classId));
    }
  }, [classId, dispatch]);

  useEffect(() => {
    const allWithoutGroup = classStudent?.data?.every(
      (student) => student.groupName === "Chưa có nhóm"
    );
    setShowCreateGroupButtons(allWithoutGroup);
  }, [classStudent]);
  const handleExportExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh_sach_hoc_sinh");
    classStudent.forEach((row) => {
      const { email, memberCode, rollNumber, username, gender } = row;
      worksheet.addRow([email, memberCode, rollNumber, username, gender ? "nam" : "nữ"]);
    });
    const fileName = "Danh_sach_hoc_sinh.xlsx";
    workbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
    });
  };
  return (
    <>
      {showCreateGroupButtons && (
        <>
          <MKBox px={"14px"} my={1} display="flex" justifyContent="end" gap="1.5rem">
            <MKButton onClick={handleExportExcel}>Tải file</MKButton>
            <MKButton onClick={handleRandomGroup}>Tạo Nhóm Ngẫu Nhiên</MKButton>
            <MKButton onClick={handleExcelGroup}>Tạo Nhóm Bằng Excel</MKButton>
          </MKBox>
        </>
      )}
      {active_create_group && <CreateGroupModal />}
      {active_create_group_excel && <CreateGroupFromExcelPopup />}
      <Tables />
    </>
  );
};

export default ListOfStudent;

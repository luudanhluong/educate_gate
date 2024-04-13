import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MKBox from "components/MKBox";
import DataTableHeadCell from "Tables/DataTableHeadCell";
import DataTableBodyCell from "Tables/DataTableBodyCell";
import MKTypography from "components/MKTypography";
import { setActivePopupCreateGroup } from "app/slices/activeSlice";
import { setActivePopupCreateGroupFromExcel } from "app/slices/activeSlice";
import { setClassId } from "app/slices/classOnerTeacherSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import getParams from "utilities/getParams";
import MKButton from "components/MKButton";
import CreateGroupModal from "layouts/sections/featuers/components/FeaturesOne/CreateGroupRandomModal";
import CreateGroupFromExcelPopup from "layouts/sections/featuers/components/CreateGroupUpFileModal";

function FullDataTable({ table, isSorted, noEndBorder }) {
  const dispatch = useDispatch();
  const url = useLocation();
  const classId = getParams(3, url.pathname);
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = tableInstance;
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
    <TableContainer
      sx={{ boxShadow: "none", overflowX: "unset", paddingBottom: "3rem", position: "relative" }}
    >
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
      <Table {...getTableProps()}>
        <MKBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MKBox>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    width={cell.column.width ? cell.column.width : "auto"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {rows.length === 0 && (
        <MKBox lineHeight={1} textAlign="center">
          <MKTypography
            mt="1rem"
            display="block"
            variant="caption"
            color="text"
            fontSize="1rem"
            fontWeight="medium"
          >
            Không có người dùng nào...
          </MKTypography>
        </MKBox>
      )}
    </TableContainer>
  );
}

FullDataTable.defaultProps = {
  isSorted: true,
  noEndBorder: false,
};

FullDataTable.propTypes = {
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  onCreateRandomGroup: PropTypes.func,
  onCreateGroupFromExcel: PropTypes.func,
};

export default FullDataTable;

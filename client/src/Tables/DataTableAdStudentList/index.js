import { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import MKBox from "components/MKBox";

import DataTableHeadCell from "Tables/DataTableHeadCell";
import DataTableBodyCell from "Tables/DataTableBodyCell";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@mui/material";
import { setPageNo, setSelectUser } from "app/slices/userSlice";
import MKPagination from "components/MKPagination";

function DataTable({ table, isSorted, noEndBorder }) {
  const { data: listStudent, count } = useSelector((state) => state.user.student);
  const { pageNo, selectUser } = useSelector((state) => state.user);
  let qttPage = Math.ceil(count / 10);
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const dispatch = useDispatch();
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const handleSelectUsersetSelectUser = (key) => {
    const index = selectUser.some((u) => u._id === listStudent[key]?._id);
    if (!index) {
      dispatch(setSelectUser([...selectUser, listStudent[key]]));
    } else {
      dispatch(setSelectUser(selectUser.filter((s) => s._id !== listStudent[key]?._id)));
    }
  };
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, page } = tableInstance;
  return (
    <TableContainer
      sx={{ boxShadow: "none", overflowX: "unset", paddingBottom: "3rem", position: "relative" }}
    >
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
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow
                onClick={() => handleSelectUsersetSelectUser(key)}
                key={key}
                {...row.getRowProps()}
                sx={{ cursor: "pointer" }}
              >
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    // width={cell.column.width ? cell.column.width : "auto"}
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
      {qttPage > 1 ? (
        <MKBox
          position="absolute"
          display="flex"
          gap="0.5rem"
          sx={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "6px",
            overflow: "auto",
          }}
        >
          <MKPagination item onClick={() => (pageNo > 0 ? dispatch(setPageNo(pageNo - 1)) : null)}>
            <Icon>keyboard_arrow_left</Icon>
          </MKPagination>
          {Array.from({ length: qttPage }, (_, index) => (
            <MKPagination key={index}>
              <MKPagination
                active={index === pageNo}
                onClick={() => dispatch(setPageNo(index))}
                item
              >
                {index + 1}
              </MKPagination>
            </MKPagination>
          ))}
          <MKPagination
            item
            onClick={() => (qttPage - 1 > pageNo ? dispatch(setPageNo(pageNo + 1)) : null)}
          >
            <Icon>keyboard_arrow_right</Icon>
          </MKPagination>
        </MKBox>
      ) : (
        ""
      )}
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;

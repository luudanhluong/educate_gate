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
import Pagination from "pagination";
import { AppBar, Grid, Tab, Tabs } from "@mui/material";
import { setRole } from "app/slices/userSlice";

function DataTable({ table, isSorted, noEndBorder }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { pageNo } = useSelector((state) => state.utilities);
  let qttPage = 0;
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const handleTabType = (event, newValue) => dispatch(setRole(newValue));
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, page } = tableInstance;

  return (
    <TableContainer
      sx={{ boxShadow: "none", overflowX: "unset", paddingBottom: "3rem", position: "relative" }}
    >
      <MKBox px={3}>
        <Grid item xs={6}>
          <AppBar position="static">
            <Tabs value={role} onChange={handleTabType}>
              <Tab
                icon={
                  <MKBox
                    component="i"
                    color="dark"
                    mr={1.25}
                    sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                    className="fas fa-desktop"
                  />
                }
                value={4}
                label="Học sinh"
              />
              <Tab
                icon={
                  <MKBox
                    component="i"
                    color="dark"
                    mr={1.25}
                    sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                    className="fas fa-code"
                  />
                }
                value={2}
                label="Giáo viên"
              />
              <Tab
                icon={
                  <MKBox
                    component="i"
                    color="dark"
                    mr={1.25}
                    sx={{ fontSize: ({ typography: { size } }) => size.sm }}
                    className="fas fa-code"
                  />
                }
                value={3}
                label="Người hướng dẫn"
              />
            </Tabs>
          </AppBar>
        </Grid>
      </MKBox>
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
      {qttPage > 1 && <Pagination pageNo={pageNo} qttPage={qttPage} />}
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

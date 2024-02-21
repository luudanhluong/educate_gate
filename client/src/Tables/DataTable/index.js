import { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";

import DataTableHeadCell from "Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "Tables/DataTable/DataTableBodyCell";
import { useDispatch } from "react-redux";
import { setActivePopupAddListUser } from "app/slices/activeSlice";
import { Autocomplete } from "@mui/material";
import { setFilterRole } from "app/slices/userSlice";

function DataTable({ userTypes, table, isSorted, noEndBorder }) {
  const userType = userTypes ? userTypes.map((el) => ({ name: el.name, role: el.role })) : [];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const dispatch = useDispatch();
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    setGlobalFilter,
  } = tableInstance;
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);
  return (
    <TableContainer sx={{ boxShadow: "none", overflowX: "unset" }}>
      <MKBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        sx={{ gap: "0.5rem" }}
      >
        <MKBox
          fontWeight="bold"
          className="pointer"
          id={"btn_add_new_list_user"}
          py={1}
          px={2}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "6px",
            },
            "&:active": {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
            userSelect: "none",
          }}
          onClick={() => dispatch(setActivePopupAddListUser(true))}
        >
          Add new list
        </MKBox>
        <MKBox display="flex" alignItems="center">
          <Autocomplete
            disableClearable
            options={userType}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => dispatch(setFilterRole(value.role))}
            size="small"
            isOptionEqualToValue={(option, value) => option.role === value.role}
            sx={{ width: "12rem" }}
            renderInput={(params) => <MKInput {...params} label="Lọc theo vai trò" />}
          />
        </MKBox>
        <MKBox width="16rem" ml="auto">
          <MKInput
            placeholder="Search..."
            size="small"
            fullWidth
            onChange={({ currentTarget }) => {
              onSearchChange(currentTarget.value);
            }}
          />
        </MKBox>
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
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  userTypes: [],
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  userTypes: PropTypes.objectOf(PropTypes.array),
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

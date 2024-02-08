import { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";

import DataTableHeadCell from "Tables/DataTableUserList/DataTableHeadCell";
import DataTableBodyCell from "Tables/DataTableUserList/DataTableBodyCell";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Icon } from "@mui/material";
import { setFilterRole, setPageNo, setSearchValue } from "app/slices/userSlice";
import MKPagination from "components/MKPagination";
import { setActivePopup } from "app/slices/activeSlice";

function DataTable({ table, isSorted, noEndBorder }) {
  const { userTypes, total, limit } = useSelector((state) => state.user.users);
  const { pageNo } = useSelector((state) => state.user);
  const userType = userTypes ? userTypes.map((el) => ({ name: el.name, role: el.role })) : [];
  let qttPage = total ? Math.ceil(total / limit) : 0;
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const dispatch = useDispatch();
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, page } = tableInstance;
  const onSearchChange = (value) => {
    dispatch(setSearchValue(value));
  };
  return (
    <TableContainer
      sx={{ boxShadow: "none", overflowX: "unset", paddingBottom: "3rem", position: "relative" }}
    >
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
          onClick={() => dispatch(setActivePopup(true))}
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
            placeholder="Search email..."
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

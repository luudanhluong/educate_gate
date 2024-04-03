import { useMemo } from "react";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";

import DataTableHeadCell from "Tables/DataTableHeadCell";
import DataTableBodyCell from "Tables/DataTableBodyCell";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@mui/material";
import MKPagination from "components/MKPagination";
import { setPageNo, setMentorChoice, setSearchValue } from "app/slices/temporaryMatching";
import MKButton from "components/MKButton";
import axios from "axios";
import { BASE_URL } from "utilities/initialValue";
import { setActivePopup } from "app/slices/activeSlice";
import { setGroups } from "app/slices/groupSlice";

function DataTable({ table, isSorted, noEndBorder }) {
  const {
    data: listTemporaryMaching,
    count,
    limit,
  } = useSelector((state) => state.temporaryMatching.temporaryMatching);
  const { pageNo, mentorChoice } = useSelector((state) => state.temporaryMatching);
  const { classId } = useSelector((state) => state.classOnerTeacher);
  let qttPage = count ? Math.ceil(count / limit) : 0;
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, page } = tableInstance;
  const handleChoiceMentor = () => {
    if (mentorChoice._id) {
      axios
        .post(
          `${BASE_URL}/matched`,
          { mentorId: mentorChoice.mentorId[0]?._id, groupId: mentorChoice?.groupId },
          config
        )
        .then(() =>
          axios
            .get(`${BASE_URL}/group/${classId}/groups`, config)
            .then((res) => dispatch(setGroups(res.data)))
            .catch((error) => console.log(error.message))
        )
        .catch((err) => console.log(err.message));

      dispatch(setActivePopup(false));
      dispatch(setMentorChoice({}));
    }
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
        <MKBox>
          <MKButton
            variant="gradient"
            color="info"
            size="small"
            disabled={!mentorChoice._id}
            onClick={handleChoiceMentor}
          >
            Lưu
          </MKButton>
        </MKBox>
        <MKBox width="16rem" ml="auto">
          <MKInput
            placeholder="Search email..."
            size="small"
            fullWidth
            onChange={({ currentTarget }) => dispatch(setSearchValue(currentTarget.value))}
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
                  sx={{ overflowWrap: "break-word", wordWrap: "break-word" }}
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
                onClick={() => dispatch(setMentorChoice(listTemporaryMaching[key]))}
                key={key}
                {...row.getRowProps()}
                sx={{ cursor: "pointer" }}
              >
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

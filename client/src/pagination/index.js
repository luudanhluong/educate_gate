import { setPageNo } from "app/slices/utilitiesSlice";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import MKPagination from "components/MKPagination";
import { useDispatch } from "react-redux";
import { Icon } from "@mui/material";

function Pagination({ pageNo, qttPage }) {
  const dispatch = useDispatch();
  return (
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
      <MKPagination item onClick={() => pageNo > 0 && dispatch(setPageNo(pageNo - 1))}>
        <Icon>keyboard_arrow_left</Icon>
      </MKPagination>
      {Array.from({ length: qttPage }, (_, index) => (
        <MKPagination key={index}>
          <MKPagination active={index === pageNo} onClick={() => dispatch(setPageNo(index))} item>
            {index + 1}
          </MKPagination>
        </MKPagination>
      ))}
      <MKPagination item onClick={() => qttPage - 1 > pageNo && dispatch(setPageNo(pageNo + 1))}>
        <Icon>keyboard_arrow_right</Icon>
      </MKPagination>
    </MKBox>
  );
}

Pagination.defaultProps = {
  qttPage: 0,
  pageNo: 1,
};
Pagination.propTypes = {
  qttPage: PropTypes.number,
  pageNo: PropTypes.number,
};

export default Pagination;

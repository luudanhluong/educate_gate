import { setPageNo } from "app/slices/utilitiesSlice";
import Icon from "assets/theme/components/icon";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import MKPagination from "components/MKPagination";
import { useDispatch } from "react-redux";

const Pagination = ({ qttPage, pageNo }) => {
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
      <MKPagination item onClick={() => (pageNo > 0 ? dispatch(setPageNo(pageNo - 1)) : null)}>
        <Icon>keyboard_arrow_left</Icon>
      </MKPagination>
      {Array.from({ length: qttPage }, (_, index) => (
        <MKPagination key={index}>
          <MKPagination active={index === pageNo} onClick={() => dispatch(setPageNo(index))} item>
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
  );
};
Pagination.propTypes = {
  qttPage: PropTypes.number.isRequired,
  pageNo: PropTypes.number.isRequired,
};
export default Pagination;

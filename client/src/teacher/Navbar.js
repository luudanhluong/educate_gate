// src/components/Navbar.js
import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ onSelect }) => {
  return (
    <div className="navbar">
      <ul>
        <li onClick={() => onSelect("classes")}>Danh sách lớp</li>
        {/* Thêm các chức năng khác vào đây nếu cần */}
      </ul>
    </div>
  );
};
Navbar.propTypes = {
  onSelect: PropTypes.func.isRequired, // Xác định onSelect là một function và bắt buộc
};
export default Navbar;

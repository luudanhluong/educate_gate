import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { BASE_URL } from "utilities/initialValue";

Modal.setAppElement("#root");

const ProjectUpdateComponent = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [newProjectInfo, setNewProjectInfo] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };

      axios
        .get("http://localhost:9999/user/is-leader", config)
        .then((response) => {
          setIsLeader(response.data.isLeader);
        })
        .catch((error) => {
          console.error("Error checking leader status:", error);
          setError("Không thể kiểm tra quyền leader.");
        });

      axios
        .get("http://localhost:9999/category/get-all", config)
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setCategories(response.data.data);
          } else {
            console.error("Expected an array but got:", response.data);
            setError("Dữ liệu danh mục không đúng định dạng.");
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setError("Không thể lấy danh sách danh mục.");
        });
    }
  }, []);

  useEffect(() => {
    setIsFormValid(
      project.name.trim() !== "" &&
        project.description.trim() !== "" &&
        selectedCategoryIds.length > 0
    );
  }, [project, selectedCategoryIds]);

  const handleInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    if (!isLeader) {
      setError("Chỉ leader mới có thể tạo hoặc cập nhật dự án.");
      return;
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setError("");
    setNewProjectInfo(null);
  };

  const submitProjectUpdate = async () => {
    if (!isFormValid) {
      setError("Vui lòng nhập đầy đủ thông tin và chọn ít nhất một danh mục.");
      return;
    }

    const jwt = localStorage.getItem("jwt");
    if (jwt && isLeader) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };

      try {
        const response = await axios.post(
          `${BASE_URL}/project/create-or-update`,
          {
            name: project.name,
            description: project.description,
            categoryIds: selectedCategoryIds,
          },
          config
        );
        setNewProjectInfo(response.data);
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error submitting new project:", error);
        setError("Đã có lỗi xảy ra khi cập nhật dự án.");
      }
    }
  };

  return (
    <div className="project-update-container">
      <button onClick={openModal}>Đăng Dự Án</button>
      {newProjectInfo && (
        <div>
          <h3>{newProjectInfo.name}</h3>
          <p>Project ID: {newProjectInfo._id}</p>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Cập Nhật Dự Án"
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            maxWidth: "600px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "12px",
            outline: "none",
            padding: "30px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
          },
        }}
      >
        <h2 style={{ marginBottom: "30px", color: "#333", fontSize: "24px" }}>Post Project</h2>
        {error && (
          <p className="error-message" style={{ color: "red", marginBottom: "20px" }}>
            {error}
          </p>
        )}
        <div className="project-update-form" style={{ display: "flex", flexDirection: "column" }}>
          {/* Form inputs and category selection */}
          {/* Name field */}
          <label style={{ marginBottom: "10px", fontSize: "17px", color: "#333" }}>
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            placeholder="Name of project"
            style={{
              marginBottom: "20px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          />
          {/* Description field */}
          <label style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
            Description
          </label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleInputChange}
            placeholder="Describe project"
            style={{
              marginBottom: "20px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              minHeight: "150px",
              fontFamily: "inherit",
            }}
          />
          {/* Category selection */}
          <div className="category-selection" style={{ marginBottom: "20px" }}>
            <label style={{ marginBottom: "10px", fontSize: "17px", color: "#333" }}>
              Categories
            </label>
            {categories.map((category) => (
              <div key={category._id}>
                <input
                  type="checkbox"
                  id={category._id}
                  value={category._id}
                  checked={selectedCategoryIds.includes(category._id)}
                  onChange={(e) => {
                    const newSelectedCategoryIds = e.target.checked
                      ? [...selectedCategoryIds, category._id]
                      : selectedCategoryIds.filter((id) => id !== category._id);
                    setSelectedCategoryIds(newSelectedCategoryIds);
                  }}
                />
                <label htmlFor={category._id} style={{ marginLeft: "5px" }}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "transparent",
                color: "#007BFF",
                border: "1px solid #007BFF",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e2e6ea";
                e.target.style.color = "#0056b3";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#007BFF";
              }}
            >
              Close
            </button>
            <button
              onClick={submitProjectUpdate}
              disabled={!isFormValid}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "1px solid #007BFF",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectUpdateComponent;

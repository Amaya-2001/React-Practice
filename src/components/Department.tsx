import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

type DepartmentDetails = {
  departmentId: number;
  departmentName: string;
};

export const Department = () => {
  const [departmentDetails, setDepartmentDetails] =
    useState<DepartmentDetails[]>();
  const [departmentName, setDepartmentName] = useState<string>("");
  const [editDepartmentName, setEditDepartmentName] =
    useState<string>(departmentName);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [status, setStatus] = useState<any>();

  const getDepartmentDetails = async () => {
    await axios
      .get("https://localhost:7260/api/department/all")
      .then((response) => {
        if (response.data) {
          setDepartmentDetails(response.data);
        }
      });
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("https://localhost:7260/api/department", {
          departmentName: departmentName,
        })
        .then(() => setStatus("Added"));
      getDepartmentDetails();
      setDepartmentName("");
    } catch (error) {
      console.log("Error occured while adding new department", error);
    }
  };

  const handleDeleteDepartment = async (departmentId: number) => {
    try {
      await axios
        .delete(`https://localhost:7260/api/department/delete/${departmentId}`)
        .then(() => setStatus("Deleted"));
      await getDepartmentDetails();
    } catch (error) {
      console.error("Error occured while deleting...!", error);
    }
  };

  const openEditModal = (departmentId: number, departmentName: string) => {
    setEditDepartmentName(departmentName);
    setDepartmentId(departmentId);
    const modalDiv = document.getElementById("editModal");
    if (modalDiv != null) {
      modalDiv.style.display = "block";
    }
  };

  const handleCloseModal = () => {
    const modalDiv = document.getElementById("editModal");
    if (modalDiv != null) {
      modalDiv.style.display = "none";
    }
  };

  const handleSaveEditDepartment = async (departmentId: number) => {
    try {
      await axios
        .put(`https://localhost:7260/api/department/edit/${departmentId}`, {
          departmentName: editDepartmentName,
        })
        .then(() => setStatus("Edited"));
      await getDepartmentDetails();
      setDepartmentName("");
      handleCloseModal();
    } catch (error) {
      console.error("Error occured while editing..!", error);
    }
  };

  useEffect(() => {
    getDepartmentDetails();
  }, []);

  return (
    <div className="container">
      <form className="w-50 justify-content-center align-items-center">
        <div className="mb-3">
          <label className="form-label">Department Name</label>
          <input
            type="text"
            className="form-control"
            name="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleAddDepartment}
        >
          Add New Department
        </button>
      </form>
      <div className="table container">
        <Table>
          <thead>
            <tr>
              <th>Department Id</th>
              <th>Department Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departmentDetails &&
              departmentDetails.map((department, index) => (
                <tr key={index}>
                  <td>{department.departmentId}</td>
                  <td>{department.departmentName}</td>
                  <td>
                    <PencilSquare
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        openEditModal(
                          department.departmentId,
                          department.departmentName
                        )
                      }
                    />
                    <span>
                      <Trash
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteDepartment(department.departmentId)
                        }
                      />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {status && (
          <div className="card text-center m-3">
            <h5 className="card-header">{status} Department</h5>
            <div className="card-body">Status: {status} Successfully!</div>
          </div>
        )}
      </div>

      {/* Edit Modal Open */}
      <div className="modal" role="dialog" id="editModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Department</h5>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                name="departmentName"
                value={editDepartmentName}
                onChange={(e) => setEditDepartmentName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => handleCloseModal()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveEditDepartment(departmentId)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link to="/">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

/* MODULE */
import React, { ReactNode, useEffect, useState } from "react";
import { BiEditAlt, BiPlus, BiTrash } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BsDownload, BsUpload, BsFilter } from "react-icons/bs";
import { TableColumn } from "./TableColumn";
import { Modal } from "react-bootstrap";
import Form from "../form/Form";

interface BasicCRUDTableProps {
  title?: string;
  columns: TableColumn[];
  data: any[];
  indexedRow?: boolean;
  hasImportCsv?: boolean;
  hasExportPdf?: boolean;
  addModalForm: ReactNode;
}

const BasicCRUDTable1 = ({
  title,
  columns,
  data,
  indexedRow = false,
  hasImportCsv = false,
  hasExportPdf = false,
  addModalForm,
}: BasicCRUDTableProps) => {
  /* HOOOKS */
  const [filters, setFilters] = useState<{ [key: string]: string }>();
  useEffect(() => {
    const arrFilters: { [key: string]: string } = {};
    for (const column of columns) {
      arrFilters[column.propTarget] = "";
    }
    setFilters(arrFilters);
  }, [columns]);
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);

  /* STYLES */
  const filterContainerStyle = {
    height: "30px",
    width: "fit-content",
    borderBottom: "1px outset",
    paddingBottom: "5px",
    display: "flex",
    alignItems: "center",
  };
  const filterStyle = {
    outline: "none",
    border: "unset",
  };

  /* LOGIC */
  const showAddModal = () => {
    setAddModalVisibility(true);
  };
  const hideAddModal = () => {
    setAddModalVisibility(false);
  };

  const filterData = () => {
    let filteredData = data;
    for (const column of columns) {
      filteredData = filteredData.filter((item) => {
        return item[column.propTarget]
          .toString()
          .toLowerCase()
          .includes(filters ? filters[column.propTarget].toLowerCase() : "");
      });
    }
    return filteredData;
  };
  const handleFilter = (filter: string, value: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter] = value;
    setFilters({ ...arrFilter });
  };
  const clearFilter = (filter: string) => {
    const arrFilter = { ...filters };
    arrFilter[filter] = "";
    setFilters({ ...arrFilter });
  };

  /* ELEMENT */
  const addModal = (
    <Modal show onHide={hideAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new {title && title.toLowerCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{addModalForm}</Modal.Body>
    </Modal>
  );

  //   const updateModal = (row: any) => {
  //     return (
  //       <Modal show onHide={hideUpdateModal}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Update general chart of account</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>{updateForm}</Modal.Body>
  //       </Modal>
  //     );
  //   };

  return (
    <div className="m-4 bg-white">
      <div className="d-flex flex-column flex-md-row justify-content-md-between p-3">
        {title && <h3>{title}</h3>}
        <div
          className="d-flex align-items-center mt-sm-3 mt-md-0"
          style={{ height: "fit-content" }}
        >
          <div className="action d-flex">
            {hasImportCsv && (
              <button className="btn btn-outline-success d-flex align-items-center me-2">
                <BsUpload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Import csv
              </button>
            )}
            {hasExportPdf && (
              <button className="btn btn-outline-dark d-flex align-items-center">
                <BsDownload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Export pdf
              </button>
            )}
          </div>
          <button className="mx-1 btn btn-outline-primary">
            <BiPlus style={{ fontSize: "20px" }} onClick={showAddModal} />
            {addModalVisibility && addModal}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="px-2 table-bordered table-dark">
            <tr
              style={{
                color: "#000",
                fontSize: "1rem",
                fontWeight: "bold",
                borderBottom: "1px solid #959090",
              }}
              className="text-white"
            >
              {indexedRow && (
                <th scope="col">
                  <div>#.</div>
                </th>
              )}
              {columns.map((column, index) => {
                return (
                  <th scope="col" key={"table-header-" + index}>
                    <div>{column.name}</div>
                    <div style={filterContainerStyle}>
                      <BsFilter
                        className="me-1 d-none d-md-block"
                        style={{ fontSize: "23px" }}
                      />
                      <input
                        className="bg-dark text-white"
                        style={filterStyle}
                        placeholder={"Filter by '" + column.name + "'"}
                        type="text"
                        value={filters ? filters[column.propTarget] : ""}
                        onChange={(event) => {
                          handleFilter(column.propTarget, event.target.value);
                        }}
                      />
                      <AiOutlineClose
                        onClick={() => {
                          clearFilter(column.propTarget);
                        }}
                      />
                      {/* <button className="btn btn-close"></button> */}
                    </div>
                  </th>
                );
              })}
              <th scope="col">
                <div>Actions</div> <div style={{ height: "30px" }}></div>
              </th>
            </tr>
          </thead>
          <tbody className="px-2">
            {filterData().length === 0 && (
              <tr>
                {indexedRow && <td></td>}
                {columns.map((column, index) => {
                  return (
                    <td
                      key={"table-row-null-" + index}
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      null
                    </td>
                  );
                })}
                <td></td>
              </tr>
            )}
            {filterData().map((row, index) => {
              return (
                <tr key={"table-body-" + index}>
                  {indexedRow && (
                    <th scope="row" className="mt-auto">
                      {index + 1}.
                    </th>
                  )}
                  {columns.map((column, index2) => {
                    return (
                      <td key={"table-row-" + index + "-" + index2}>
                        {row[column.propTarget]}
                      </td>
                    );
                  })}
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-outline-warning" /*onClick={showUpdateModal}*/
                      >
                        <BiEditAlt />
                        {/* {updateModalVisibility && <>{updateModal(row)}</>} */}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => /*handleRemove(row) */ null}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BasicCRUDTable1;

/* MODULES */
import { ReactNode, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { BiDownArrowAlt, BiPlus, BiEditAlt, BiTrash } from "react-icons/bi";
import { BsDownload, BsUpload } from "react-icons/bs";
import Form from "../form/Form";

interface BasicCRUDTableProps {
  columns: any[];
  data: any[];
  title: string;
  toFilter?: string[];
  hasImport?: boolean;
  hasExport?: boolean;
  addModalForm?: ReactNode;
}

const BasicCRUDTable = ({
  columns,
  data,
  title,
  toFilter,
  hasImport = false,
  hasExport = false,
  addModalForm,
}: BasicCRUDTableProps) => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  useEffect(() => {
    setFilteredItems(data);
  }, [data]);
  const [addModalVisibility, setAddModalVisibility] = useState(false);

  /* STYLES */
  const datatableStyle = {
    table: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#000",
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderBottom: "1px solid #959090",
      },
    },
    cells: {
      style: {
        color: "#000",
        fontSize: "1rem",
      },
    },
  };

  /* HANDLERS */
  const handleFilter = (filter: string) => {
    setFilteredItems(
      filter === ""
        ? data
        : data.filter((item) => {
            if (toFilter == null) {
              for (const key in item) {
                if (
                  item[key]
                    .toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ) {
                  return true;
                }
              }
              return false;
            } else {
              for (const key in item) {
                if (toFilter.includes(key)) {
                  if (
                    item[key]
                      .toString()
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  ) {
                    return true;
                  }
                }
              }
              return false;
            }
          })
    );
  };

  /* LOGIC */
  const showAddModal = () => {
    setAddModalVisibility(true);
  };

  const hideAddModal = () => {
    setAddModalVisibility(false);
  };

  /* ELEMENT */
  const addModal = (
    <Modal show onHide={hideAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new {title.toLowerCase()}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{addModalForm}</Modal.Body>
    </Modal>
  );

  return (
    <div className="m-4 bg-white">
      <div className="d-flex flex-column flex-md-row justify-content-md-between p-3">
        <div>
          <h3>{title}</h3>
          <div className="action d-flex">
            {hasImport && (
              <button className="btn btn-outline-success d-flex align-items-center me-2">
                <BsUpload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Import csv
              </button>
            )}
            {hasExport && (
              <button className="btn btn-outline-primary d-flex align-items-center">
                <BsDownload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Export pdf
              </button>
            )}
          </div>
        </div>
        <div
          className="d-flex align-items-center mt-sm-3 mt-md-0"
          style={{ height: "fit-content" }}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="Filter..."
            onChange={(event) => {
              handleFilter(event.target.value);
            }}
            className="rounded border-1 p-2"
            style={{ height: "35px" }}
          />
          <BiPlus className="add-button mx-1" onClick={showAddModal} />
          {addModalVisibility && addModal}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        fixedHeader
        customStyles={datatableStyle}
        striped
        responsive
        sortIcon={<BiDownArrowAlt />}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationPerPage={5}
        noDataComponent={
          <p
            className="p-4"
            style={{
              fontSize: "20px",
            }}
          >
            <b>Records empty</b>
          </p>
        }
      />
    </div>
  );
};

export default BasicCRUDTable;

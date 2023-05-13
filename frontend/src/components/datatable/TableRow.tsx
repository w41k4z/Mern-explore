/* COMPONENTS */
import { ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";

/* HELPER */
import { formatNumberToCurrency } from "../../helpers/NumberHelper";

interface TableRowProps {
  columns: any[];
  data: any;
  indexedRow: boolean;
  index: number;
  updateModalForm: ReactNode;
  dataPropIDName: string;
}

const TableRow = ({
  columns,
  data,
  indexedRow,
  index,
  updateModalForm,
  dataPropIDName,
}: TableRowProps) => {
  /* HOOKS */
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);

  /* LOGIC */
  const showUpdateModal = () => setUpdateModalVisibility(true);
  const hideUpdateModal = () => setUpdateModalVisibility(false);
  const showDeleteModal = () => setDeleteModalVisibility(true);
  const hideDeleteModal = () => setDeleteModalVisibility(false);

  /* ELEMENT */
  const updateModal = (row: any) => {
    return (
      <Modal show onHide={hideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update general chart of account</Modal.Title>
        </Modal.Header>
        <Modal.Body>{updateModalForm}</Modal.Body>
      </Modal>
    );
  };
  const deleteModal = (id: string) => (
    <Modal show onHide={hideDeleteModal} centered>
      <Modal.Body
        className="text-center"
        style={{ fontStyle: "bold", fontSize: "25px" }}
      >
        Are you sure you want to delete this ? {id}
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={hideDeleteModal}>
            Cancel
          </button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <tr>
      {indexedRow && (
        <th scope="row" className="mt-auto">
          {index}.
        </th>
      )}
      {columns.map((column, index2) => {
        return (
          <td
            key={"table-row-" + index + "-" + index2}
            className={column.format === "currency" ? "text-end" : ""}
          >
            {column.format === "currency"
              ? formatNumberToCurrency(data[column.propTarget])
              : data[column.propTarget]}
          </td>
        );
      })}
      <td className="btn-group">
        <button className="btn btn-outline-warning" onClick={showUpdateModal}>
          <BiEditAlt />
        </button>
        {updateModalVisibility && updateModal(data)}
        <button className="btn btn-outline-danger" onClick={showDeleteModal}>
          <BiTrash />
        </button>
        {deleteModalVisibility && deleteModal(data[dataPropIDName])}
      </td>
    </tr>
  );
};

export default TableRow;

/* MODULE */
import React, { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */

/* TYPE */
import { JournalCode } from "../../../../models/journalCode";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";
import { BsDownload, BsUpload } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";

interface JournalTransactionRecordProps {
  society: Society;
  ceo: UserAccount;
}
const JournalTransactionRecordPage = ({
  society,
  ceo,
}: JournalTransactionRecordProps) => {
  /* HOOKS */
  const [codes, setCodes] = useState<JournalCode[]>([]);
  const [selectedCode, setSelectedCode] = useState<JournalCode>(
    {} as JournalCode
  );
  useEffect(() => {
    if (society._id) {
      fetchAllCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  const [addModalVisibility, setAddModalVisibility] = useState(false);

  /* LOGIC */
  const showAddModal = () => setAddModalVisibility(true);
  const hideAddModal = () => setAddModalVisibility(false);

  const fetchAllCode = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/journal-code/all-journal-code", formData)
      .then((res) => {
        setCodes(res.data);
        setSelectedCode(res.data[0]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* ELEMENT */
  const addModal = (
    <Modal show fullscreen onHide={hideAddModal}>
      <Modal.Header closeButton className="bg-dark text-white">
        Insert new journal
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped table-responsive">
          <thead className="px-2 table-bordered">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Part reference</th>
              <th scope="col">Label</th>
              <th scope="col">General account</th>
              <th scope="col">Entitled</th>
              <th scope="col">Third party</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
            </tr>
          </thead>
          <tbody className="px-2">
            <tr>
              <td>
                <input className="form-control-sm" type="date" name="" id="" />
              </td>
              <td className="d-flex">
                <select className="form-select-sm" name="" id="">
                  <option value="">AN</option>
                  <option value="">VE</option>
                  <option value="">BO</option>
                </select>
                <input className="form-control-sm" type="text" />
              </td>
              <td>
                <input className="form-control-sm" type="text" />
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="datalist"
                  id="generalChartOfAccount"
                />
                <datalist>
                  <option value="">10000</option>
                  <option value="">11000</option>
                  <option value="">12800</option>
                  <option value="">20100</option>
                </datalist>
              </td>
              <td>
                <input className="form-control-sm" type="text" />
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="datalist"
                  id="thirdPartyChartOfAccount"
                />
                <datalist>
                  <option value="">Noro</option>
                  <option value="">Solo</option>
                  <option value="">Papa</option>
                </datalist>
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="number"
                  name=""
                  id=""
                />
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="number"
                  name=""
                  id=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={hideAddModal}>
            Cancel
          </button>
          <button className="btn btn-success">Add</button>
        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="m-4 bg-white">
      <div className="header p-4 d-sm-block d-md-flex justify-content-between">
        <div className="leftHeader">
          <select
            className="me-2 form-select-sm"
            style={{ fontStyle: "bold", fontSize: "20px" }}
          >
            <option value="1">JAN</option>
            <option value="2">FEB</option>
            <option value="3">MAR</option>
            <option value="4">APR</option>
            <option value="5">MAY</option>
            <option value="6">JUN</option>
            <option value="7">JUL</option>
            <option value="8">AUG</option>
            <option value="9">SEP</option>
            <option value="10">OCT</option>
            <option value="11">NOV</option>
            <option value="12">DEC</option>
          </select>
          :
          <select
            className="ms-2 form-select-sm"
            style={{ fontStyle: "bold", fontSize: "20px" }}
            onChange={(event) => {
              setSelectedCode(codes[parseInt(event.target.value)]);
            }}
          >
            {codes.map((code, index) => (
              <option key={code._id} value={index}>
                {code.entitled}
              </option>
            ))}
          </select>
        </div>
        <div className="rightHeader d-flex">
          <button className="btn btn-outline-success d-flex align-items-center me-2">
            <BsUpload style={{ fontSize: "20px" }} className="me-2" />
            Import csv
          </button>
          <button className="btn btn-outline-dark d-flex align-items-center">
            <BsDownload style={{ fontSize: "20px" }} className="me-2" /> Export
            pdf
          </button>
          <button
            className="ms-2 btn btn-outline-primary"
            onClick={showAddModal}
          >
            <BiPlus style={{ fontSize: "20px" }} />
          </button>
          {addModalVisibility && addModal}
        </div>
      </div>
    </div>
  );
};

export default JournalTransactionRecordPage;

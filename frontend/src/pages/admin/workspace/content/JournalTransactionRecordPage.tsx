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

  /* LOGIC */
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
          <button className="ms-2 btn btn-outline-primary">
            <BiPlus style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalTransactionRecordPage;

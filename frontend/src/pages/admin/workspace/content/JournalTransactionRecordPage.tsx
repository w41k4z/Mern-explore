/* MODULE */
import React, { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */
import { BiPlus } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import { BsDownload, BsUpload } from "react-icons/bs";
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";

/* TYPE */
import { JournalCode } from "../../../../models/journalCode";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";
import { Journal } from "../../../../models/journal";
import { ReferenceDocument } from "../../../../models/referenceDocument";
import { ChartOfAccount } from "../../../../models/chartOfAccount";
import { ThirdPartyChartOfAccount } from "../../../../models/thirdPartyChartOfAccount";

/* HELPER */
import { formatDate, formatMonthYear } from "../../../../helpers/DateHelper";

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
  const [actualMonth, setActualMonth] = useState(new Date());
  useEffect(() => {
    if (society._id) {
      fetchAllJournal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCode, actualMonth]);
  const [references, setReferences] = useState<ReferenceDocument[]>([]);
  const [generalChartOfAccounts, setGeneralChartOfAccounts] = useState<
    ChartOfAccount[]
  >([]);
  const [thirdPartyChartOfAccounts, setThirdPartyChartOfAccounts] = useState<
    ThirdPartyChartOfAccount[]
  >([]);
  const [journal, setJournal] = useState<Journal>({} as Journal);
  useEffect(() => {
    if (society._id) {
      fetchAllCode();
      fetchAllReference();
      fetchAllChartOfAccount();
      fetchAllThirdPartyChartOfAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  useEffect(() => {
    journal.code = selectedCode.code;
  }, [journal, selectedCode]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [uploadingFile, setUploadingFile] = useState<File>();
  const [addModalVisibility, setAddModalVisibility] = useState(false);
  const [importModalVisibility, setImportModalVisibility] = useState(false);

  /* LOGIC */
  const showAddModal = () => setAddModalVisibility(true);
  const hideAddModal = () => setAddModalVisibility(false);
  const showImportModal = () => setImportModalVisibility(true);
  const hideImportModal = () => setImportModalVisibility(false);

  const fetchAllJournal = () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    formData.append("code", selectedCode.code);
    formData.append("month", formatDate(actualMonth));
    Axios.post("/api/journal/journals", formData)
      .then((res) => {
        setJournals(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
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
  const fetchAllReference = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/reference-document/all-reference-document", formData)
      .then((res) => {
        setReferences(res.data);
        setJournal({
          societyID: society._id,
          date: new Date(),
          code: "",
          reference: res.data[0].reference,
          refNumber: "",
          description: "",
          details: [
            {
              generalAccount: "",
              thirdPartyAccount: "",
              debit: 0,
              credit: 0,
            },
          ],
          isClosed: false,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const fetchAllChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/all-chart-of-account", formData)
      .then((res) => {
        setGeneralChartOfAccounts(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const fetchAllThirdPartyChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post(
      "/api/third-party-chart-of-account/all-third-party-chart-of-account",
      formData
    )
      .then((res) => {
        setThirdPartyChartOfAccounts(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addDetail = () => {
    const updatedJournal = { ...journal };
    updatedJournal.details.push({
      generalAccount: "",
      thirdPartyAccount: "",
      debit: 0,
      credit: 0,
    });
    setJournal(updatedJournal);
  };

  const validDetails = () => {
    let sumDebit = 0;
    let sumCredit = 0;
    journal.details.forEach((detail) => {
      sumDebit += detail.debit ? detail.debit : 0;
      sumCredit += detail.credit ? detail.credit : 0;
    });
    return sumDebit === sumCredit;
  };
  const saveJournal = async () => {
    if (validDetails()) {
      const formData = new FormData();
      formData.append("societyID", journal.societyID);
      formData.append("code", journal.code);
      formData.append("date", formatDate(journal.date));
      formData.append(
        "description",
        journal.description ? journal.description : ""
      );
      formData.append("reference", journal.reference);
      formData.append("refNumber", journal.refNumber);
      formData.append("details", JSON.stringify(journal.details));
      await Axios.post("/api/journal/create", formData)
        .then((res) => {
          alert("No error");
          hideAddModal();
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Debit and credit must be equal");
    }
  };

  const uploadData = async (csvFile: File) => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("societyID", society._id);
    await Axios.post("/api/journal/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        // fetchAllChartOfAccount();
        console.log(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* STYLE */
  const inputStyle = {
    outline: "none",
    border: "none",
    borderBottom: "1px solid",
    background: "transparent",
  };

  /* ELEMENT */
  const addModal = (
    <Modal show fullscreen onHide={hideAddModal}>
      <Modal.Header className="bg-dark text-white d-flex justify-content-between">
        <h3>Insert new '{selectedCode.code}' journal</h3>
        <button className="ms-2 btn btn-success" onClick={addDetail}>
          <BiPlus style={{ fontSize: "20px" }} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-responsive">
          <thead className="px-2 table-bordered">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Part reference</th>
              <th scope="col">Label</th>
              <th scope="col">General account</th>
              <th scope="col">Third party</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
            </tr>
          </thead>
          <tbody className="px-2">
            <tr>
              <td>
                <input
                  className="form-control-sm"
                  type="date"
                  defaultValue={journal.date ? formatDate(journal.date) : ""}
                  onChange={(event) => {
                    journal.date = new Date(event.target.value);
                    setJournal({ ...journal });
                  }}
                  style={inputStyle}
                />
              </td>
              <td className="d-flex">
                <select
                  className="form-select-sm"
                  onChange={(event) => {
                    journal.reference = event.target.value;
                    setJournal({ ...journal });
                  }}
                  style={inputStyle}
                >
                  {references.map((ref) => (
                    <option key={ref._id} value={ref.reference}>
                      {ref.reference}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control-sm"
                  type="text"
                  defaultValue={journal.refNumber ? journal.refNumber : ""}
                  onChange={(event) => {
                    journal.refNumber = event.target.value;
                    setJournal({ ...journal });
                  }}
                  style={inputStyle}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control-sm"
                  defaultValue={journal.details ? journal.description : ""}
                  onChange={(event) => {
                    if (journal.details) {
                      journal.description = event.target.value;
                      setJournal({ ...journal });
                    }
                  }}
                  style={inputStyle}
                />
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="text"
                  list="generalChartOfAccount"
                  defaultValue={
                    journal.details ? journal.details[0].generalAccount : ""
                  }
                  onChange={(event) => {
                    if (journal.details) {
                      journal.details[0].generalAccount = event.target.value;
                    }
                  }}
                  minLength={5}
                  maxLength={5}
                  style={inputStyle}
                />
                <datalist id="generalChartOfAccount">
                  {generalChartOfAccounts.map((account) => (
                    <option key={account._id} value={account.accountNumber} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="text"
                  list="thirdPartyChartOfAccount"
                  defaultValue={
                    journal.details ? journal.details[0].thirdPartyAccount : ""
                  }
                  onChange={(event) => {
                    if (journal.details) {
                      journal.details[0].thirdPartyAccount = event.target.value;
                    }
                  }}
                  style={inputStyle}
                />
                <datalist id="thirdPartyChartOfAccount">
                  {thirdPartyChartOfAccounts.map((account) => (
                    <option key={account._id} value={account.account} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="number"
                  defaultValue={journal.details ? journal.details[0].debit : 0}
                  onChange={(event) => {
                    if (journal.details) {
                      journal.details[0].debit = parseFloat(event.target.value);
                    }
                  }}
                  style={inputStyle}
                />
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="number"
                  defaultValue={journal.details ? journal.details[0].credit : 0}
                  onChange={(event) => {
                    if (journal.details) {
                      journal.details[0].credit = parseFloat(
                        event.target.value
                      );
                    }
                  }}
                  style={inputStyle}
                />
              </td>
            </tr>
            {journal.details &&
              journal.details.map((detail, index) => {
                if (index === 0) {
                  return (
                    <tr
                      key={index}
                      className="mt-5 text-danger text-center"
                    ></tr>
                  );
                }
                return (
                  <tr key={index}>
                    <td>
                      <input
                        className="form-control-sm"
                        type="date"
                        value={journal.date ? formatDate(journal.date) : ""}
                        style={inputStyle}
                        disabled
                      />
                    </td>
                    <td className="d-flex">
                      <select
                        className="form-select-sm"
                        value={journal.reference ? journal.reference : ""}
                        style={inputStyle}
                        disabled
                      >
                        {references.map((ref) => (
                          <option key={ref._id} value={ref.reference}>
                            {ref.reference}
                          </option>
                        ))}
                      </select>
                      <input
                        className="form-control-sm"
                        type="text"
                        value={journal.refNumber ? journal.refNumber : ""}
                        style={inputStyle}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={journal.description ? journal.description : ""}
                        className="form-control-sm"
                        style={inputStyle}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        className="form-control-sm"
                        type="text"
                        list="generalChartOfAccount"
                        defaultValue={
                          detail.generalAccount ? detail.generalAccount : ""
                        }
                        onChange={(event) =>
                          (detail.generalAccount = event.target.value)
                        }
                        minLength={5}
                        maxLength={5}
                        style={inputStyle}
                      />
                      <datalist id="generalChartOfAccount">
                        {generalChartOfAccounts.map((account) => (
                          <option
                            key={account._id}
                            value={account.accountNumber}
                          />
                        ))}
                      </datalist>
                    </td>
                    <td>
                      <input
                        className="form-control-sm"
                        type="text"
                        list="thirdPartyChartOfAccount"
                        defaultValue={
                          detail.thirdPartyAccount
                            ? detail.thirdPartyAccount
                            : ""
                        }
                        onChange={(event) =>
                          (detail.thirdPartyAccount = event.target.value)
                        }
                        style={inputStyle}
                      />
                      <datalist id="thirdPartyChartOfAccount">
                        {thirdPartyChartOfAccounts.map((account) => (
                          <option key={account._id} value={account.account} />
                        ))}
                      </datalist>
                    </td>
                    <td>
                      <input
                        className="form-control-sm"
                        type="number"
                        defaultValue={detail.debit ? detail.debit : 0}
                        onChange={(event) =>
                          (detail.debit = parseFloat(event.target.value))
                        }
                        style={inputStyle}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control-sm"
                        type="number"
                        defaultValue={detail.credit ? detail.credit : 0}
                        onChange={(event) =>
                          (detail.credit = parseFloat(event.target.value))
                        }
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={hideAddModal}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={saveJournal}>
            Add
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
  const importModal = (
    <Modal show onHide={hideImportModal}>
      <Modal.Header closeButton>
        <Modal.Title>Import csv</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="csvFile" className="form-label">
              Select csv file
            </label>
            <input
              type="file"
              className="form-control"
              id="csvFile"
              accept=".csv"
              required
              onChange={(event) => {
                if (event.target.files) {
                  setUploadingFile(event.target.files[0]);
                }
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                if (uploadingFile) {
                  uploadData(uploadingFile);
                }
                setImportModalVisibility(false);
              }}
            >
              Import
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );

  /* CONST DATA */
  const columns: TableColumn[] = [
    {
      name: "Date",
      propTarget: "date",
      format: "default",
    },
    {
      name: "Reference",
      propTarget: "reference",
      format: "default",
    },
    {
      name: "General Account",
      propTarget: "generalAccount",
      format: "default",
    },
    {
      name: "Third Party Account",
      propTarget: "thirdPartyAccount",
      format: "default",
    },
    {
      name: "Debit",
      propTarget: "debit",
      format: "currency",
    },
    {
      name: "Credit",
      propTarget: "credit",
      format: "currency",
    },
  ];

  return (
    <div className="m-4 bg-white">
      <div className="header p-4 d-sm-block d-md-flex justify-content-between">
        <div className="leftHeader d-flex align-items-center">
          <select
            className="form-select-sm"
            style={{ fontStyle: "bold", fontSize: "20px" }}
            onChange={(event) => {
              setSelectedCode(codes[parseInt(event.target.value)]);
              journal.code = codes[parseInt(event.target.value)].code;
            }}
          >
            {codes.map((code, index) => (
              <option key={code._id} value={index}>
                {code.entitled}
              </option>
            ))}
          </select>
          <input
            type="month"
            value={
              actualMonth
                ? formatMonthYear(actualMonth)
                : formatMonthYear(new Date())
            }
            className="ms-2 form-control-sm"
            onChange={(event) => {
              setActualMonth(new Date(event.target.value));
            }}
          />
        </div>
        <div className="rightHeader d-flex">
          <button
            className="btn btn-outline-success d-flex align-items-center me-2"
            onClick={showImportModal}
          >
            <BsUpload style={{ fontSize: "20px" }} className="me-2" />
            Import csv
          </button>
          {importModalVisibility && importModal}
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
      <BasicCRUDTable
        columns={columns}
        data={journals}
        dataPropIDName={"_id"}
        addModalFormInputs={[]}
        onAdd={function (): void {
          throw new Error("Function not implemented.");
        }}
        onUpdate={function (row: any): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (row: any): void {
          throw new Error("Function not implemented.");
        }}
        updateModalFormInputs={function (
          row: any
        ): { input: React.ReactNode; label?: React.ReactNode }[] {
          throw new Error("Function not implemented.");
        }}
        uploadCall={function (file: File): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default JournalTransactionRecordPage;

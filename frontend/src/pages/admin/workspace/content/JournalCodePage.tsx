/* MODULES */
import { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";
import { JournalCode } from "../../../../models/journalCode";

interface JournalCodeProps {
  society: Society;
  ceo: UserAccount;
}
const JournalCodePage = ({ society, ceo }: JournalCodeProps) => {
  /* HOOKS SECTION */
  const [codes, setCodes] = useState<JournalCode[]>([]);
  useEffect(() => {
    if (society._id) {
      fetchAllCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  const [newCode, setNewCode] = useState<JournalCode>({} as JournalCode);
  const [codeToUpdate, setCodeToUpdate] = useState<JournalCode>(
    {} as JournalCode
  );

  /* LOGIC */
  const fetchAllCode = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/journal-code/all-journal-code", formData)
      .then((res) => {
        setCodes(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addCode = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    formData.append("code", newCode.code);
    formData.append("entitled", newCode.entitled);
    await Axios.post("/api/journal-code/create", formData)
      .then((res) => {
        const allCodes = [...codes, res.data];
        setCodes(allCodes);
        setNewCode({} as JournalCode);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const uploadCode = async (csvFile: File) => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("societyID", society._id);
    await Axios.post("/api/journal-code/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        fetchAllCode();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const updateCode = async (code: JournalCode) => {
    codeToUpdate._id = code._id;
    codeToUpdate.code = code.code;
    if (codeToUpdate.entitled === undefined)
      codeToUpdate.entitled = code.entitled;
    const formData = new FormData();
    formData.append("journalCodeID", codeToUpdate._id);
    formData.append("entitled", codeToUpdate.entitled);
    await Axios.post("/api/journal-code/update", formData)
      .then((res) => {
        codes.forEach((codeCode, index) => {
          if (codeCode._id === code._id) {
            codes[index] = codeToUpdate;
          }
        });
        setCodeToUpdate({} as JournalCode);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const deleteCode = async (code: JournalCode) => {
    const formData = new FormData();
    formData.append("journalCodeID", code._id);
    await Axios.post("/api/journal-code/delete", formData)
      .then((res) => {
        const allCode = codes.filter((codeCode) => codeCode._id !== code._id);
        setCodes(allCode);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* ELEMENT */
  const addModalFormInputs = [
    {
      label: (
        <label htmlFor="code" className="form-label">
          Code
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="code"
          maxLength={2}
          minLength={2}
          onChange={(event) => {
            newCode.code = event.target.value;
          }}
          required
        />
      ),
    },
    {
      label: (
        <label htmlFor="entitled" className="form-label">
          Entitled
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="entitled"
          onChange={(event) => {
            newCode.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];
  const updateModalFormInputs = (row: JournalCode) => [
    {
      input: (
        <input
          type="hidden"
          className="form-control"
          id="journalCodeID"
          value={row._id}
          required
        />
      ),
    },
    {
      label: (
        <label htmlFor="code" className="form-label">
          Code
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="code"
          defaultValue={row.code}
          onChange={(event) => {
            codeToUpdate.code = event.target.value;
          }}
          disabled
        />
      ),
    },
    {
      label: (
        <label htmlFor="entitled" className="form-label">
          Entitled
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="entitled"
          defaultValue={row.entitled}
          onChange={(event) => {
            codeToUpdate.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];

  /* CONST DATA */
  const columns: TableColumn[] = [
    {
      name: "Code",
      propTarget: "code",
      format: "default",
    },
    {
      name: "Entitled",
      propTarget: "entitled",
      format: "default",
    },
  ];

  return (
    <BasicCRUDTable
      columns={columns}
      data={codes}
      dataPropIDName={"_id"}
      title={"Journal code"}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalFormInputs={addModalFormInputs}
      onAdd={addCode}
      onUpdate={updateCode}
      onDelete={deleteCode}
      updateModalFormInputs={updateModalFormInputs}
      uploadCall={uploadCode}
    />
  );
};

export default JournalCodePage;

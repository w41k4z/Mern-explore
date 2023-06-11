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
import { ReferenceDocument } from "../../../../models/referenceDocument";

interface ReferenceDocumentProps {
  society: Society;
  ceo: UserAccount;
}
const ReferenceDocumentPage = ({ society, ceo }: ReferenceDocumentProps) => {
  /* HOOKS SECTION */
  const [referenceDocuments, setReferenceDocuments] = useState<
    ReferenceDocument[]
  >([]);
  useEffect(() => {
    if (society._id) {
      fetchAllReferenceDocument();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  const [newReferenceDocument, setNewReferenceDocument] =
    useState<ReferenceDocument>({} as ReferenceDocument);
  const [referenceDocumentToUpdate, setReferenceDocumentToUpdate] =
    useState<ReferenceDocument>({} as ReferenceDocument);

  /* LOGIC */
  const fetchAllReferenceDocument = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/reference-document/all-reference-document", formData)
      .then((res) => {
        setReferenceDocuments(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addReferenceDocument = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    formData.append("reference", newReferenceDocument.reference);
    formData.append("meaning", newReferenceDocument.meaning);
    await Axios.post("/api/reference-document/create", formData)
      .then((res) => {
        const allRef = [...referenceDocuments, res.data];
        setReferenceDocuments(allRef);
        setNewReferenceDocument({} as ReferenceDocument);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const uploadReferenceDocument = async (csvFile: File) => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("societyID", society._id);
    await Axios.post("/api/reference-document/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        fetchAllReferenceDocument();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const updateReferenceDocument = async (
    referenceDocument: ReferenceDocument
  ) => {
    referenceDocumentToUpdate._id = referenceDocument._id;
    referenceDocumentToUpdate.reference = referenceDocument.reference;
    if (referenceDocumentToUpdate.meaning === undefined)
      referenceDocumentToUpdate.meaning = referenceDocument.meaning;
    const formData = new FormData();
    formData.append("referenceDocumentID", referenceDocumentToUpdate._id);
    formData.append("meaning", referenceDocumentToUpdate.meaning);
    await Axios.post("/api/reference-document/update", formData)
      .then((res) => {
        referenceDocuments.forEach((ref, index) => {
          if (ref._id === referenceDocument._id) {
            referenceDocuments[index] = referenceDocumentToUpdate;
          }
        });
        setReferenceDocumentToUpdate({} as ReferenceDocument);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const deleteReferenceDocument = async (
    referenceDocument: ReferenceDocument
  ) => {
    const formData = new FormData();
    formData.append("referenceDocumentID", referenceDocument._id);
    await Axios.post("/api/reference-document/delete", formData)
      .then((res) => {
        const allRef = referenceDocuments.filter(
          (ref) => ref._id !== referenceDocument._id
        );
        setReferenceDocuments(allRef);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* ELEMENT */
  const addModalFormInputs = [
    {
      label: (
        <label htmlFor="reference" className="form-label">
          Reference
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="reference"
          maxLength={2}
          minLength={2}
          onChange={(event) => {
            newReferenceDocument.reference = event.target.value;
          }}
          required
        />
      ),
    },
    {
      label: (
        <label htmlFor="meaning" className="form-label">
          Meaning
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="meaning"
          onChange={(event) => {
            newReferenceDocument.meaning = event.target.value;
          }}
          required
        />
      ),
    },
  ];
  const updateModalFormInputs = (row: ReferenceDocument) => [
    {
      input: (
        <input
          type="hidden"
          className="form-control"
          id="referenceDocumentID"
          value={row._id}
          required
        />
      ),
    },
    {
      label: (
        <label htmlFor="reference" className="form-label">
          Reference
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="reference"
          defaultValue={row.reference}
          onChange={(event) => {
            referenceDocumentToUpdate.reference = event.target.value;
          }}
          disabled
        />
      ),
    },
    {
      label: (
        <label htmlFor="meaning" className="form-label">
          Meaning
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="entitled"
          defaultValue={row.meaning}
          onChange={(event) => {
            referenceDocumentToUpdate.meaning = event.target.value;
          }}
          required
        />
      ),
    },
  ];

  /* CONST DATA */
  const columns: TableColumn[] = [
    {
      name: "Reference",
      propTarget: "reference",
      format: "default",
    },
    {
      name: "Meaning",
      propTarget: "meaning",
      format: "default",
    },
  ];

  return (
    <BasicCRUDTable
      columns={columns}
      data={referenceDocuments}
      dataPropIDName={"_id"}
      title={"Reference document"}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalFormInputs={addModalFormInputs}
      onAdd={addReferenceDocument}
      onUpdate={updateReferenceDocument}
      onDelete={deleteReferenceDocument}
      updateModalFormInputs={updateModalFormInputs}
      uploadCall={uploadReferenceDocument}
    />
  );
};

export default ReferenceDocumentPage;

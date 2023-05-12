/* MODULES */
import { useEffect, useState } from "react";
import { TableColumn } from "../../../../components/datatable/TableColumn";
import Form from "../../../../components/form/Form";
import { BiEditAlt, BiTrash } from "react-icons/bi";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";
import { Modal } from "react-bootstrap";
import BasicCRUDTable1 from "../../../../components/datatable/BasicCRUDTable1";

const GeneralChartOfAccount = () => {
  /* HOOKS SECTION */
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [chartOfAccounts, setCharOfAccounts] = useState<ChartOfAccount[]>([]);
  useEffect(() => {
    const data = [
      {
        _id: "hsdrow1yuiwehqu",
        accountNumber: "10000",
        societyID: "123890r3u098314",
        entitled: "Capital",
      },
      {
        _id: "hsdrow1yuiwehqu",
        accountNumber: "20000",
        societyID: "123890r3u098314",
        entitled: "Huhu",
      },
      {
        _id: "hsdrow1yuiwehqu",
        accountNumber: "30000",
        societyID: "123890r3u098314",
        entitled: "Dette",
      },
      {
        _id: "hsdrow1yuiwehqu",
        accountNumber: "40000",
        societyID: "123890r3u098314",
        entitled: "Fournisseur",
      },
      {
        _id: "sajfr98wer",
        accountNumber: "40100",
        societyID: "123890r3u098314",
        entitled: "Client",
      },
    ];
    setCharOfAccounts(data);
  }, []);

  /* LOGIC */
  const showUpdateModal = () => setUpdateModalVisibility(true);
  const hideUpdateModal = () => setUpdateModalVisibility(false);

  /* ELEMENT */
  const addModalForm = (
    <Form
      inputs={[
        {
          label: (
            <label htmlFor="accountNumber" className="form-label">
              Account number
            </label>
          ),
          input: (
            <input
              type="text"
              className="form-control"
              id="accountNumber"
              maxLength={5}
              minLength={5}
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
              required
            />
          ),
        },
      ]}
      action={""}
      method={""}
      validButton={<button className="btn btn-primary">Confirm</button>}
    />
  );

  const updateModal = (row: ChartOfAccount) => {
    const inputs = [
      {
        label: (
          <label htmlFor="accountNumber" className="form-label">
            Account number
          </label>
        ),
        input: (
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            defaultValue={row.accountNumber}
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
            defaultValue={row.entitled}
            required
          />
        ),
      },
    ];
    const updateForm = (
      <Form inputs={inputs} action={""} method={""} validButton={undefined} />
    );
    return (
      <Modal show onHide={hideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update general chart of account</Modal.Title>
        </Modal.Header>
        <Modal.Body>{updateForm}</Modal.Body>
      </Modal>
    );
  };

  /* CONST DATA */
  const columns: TableColumn[] = [
    {
      name: "Account number",
      propTarget: "accountNumber",
    },
    {
      name: "Entitled",
      propTarget: "entitled",
    },
  ];

  return (
    <BasicCRUDTable1
      columns={columns}
      data={chartOfAccounts}
      title={"General chart of account"}
      //toFilter={["accountNumber", "entitled"]}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalForm={addModalForm}
    />
  );
};

export default GeneralChartOfAccount;

/* COMPONENT */
import { useEffect, useState } from "react";
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";
import Form from "../../../../components/form/Form";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";

const GeneralChartOfAccount = () => {
  /* HOOKS SECTION */
  const [chartOfAccounts, setCharOfAccounts] = useState<ChartOfAccount[]>([]);
  useEffect(() => {
    const data = [
      {
        _id: "1",
        accountNumber: "10000",
        societyID: "123890r3u098314",
        entitled: "Capital",
      },
      {
        _id: "2",
        accountNumber: "20000",
        societyID: "123890r3u098314",
        entitled: "Huhu",
      },
      {
        _id: "3",
        accountNumber: "30000",
        societyID: "123890r3u098314",
        entitled: "Dette",
      },
      {
        _id: "4",
        accountNumber: "40000",
        societyID: "123890r3u098314",
        entitled: "Fournisseur",
      },
      {
        _id: "5",
        accountNumber: "40100",
        societyID: "123890r3u098314",
        entitled: "Client",
      },
    ];
    setCharOfAccounts(data);
  }, []);

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
  const updateModalForm = (row: ChartOfAccount) => {
    return (
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
        ]}
        action={""}
        method={""}
        validButton={<button className="btn btn-primary">Confirm</button>}
      />
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
    <BasicCRUDTable
      columns={columns}
      data={chartOfAccounts}
      dataPropIDName={"_id"}
      title={"General chart of account"}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalForm={addModalForm}
      updateModalForm={updateModalForm}
    />
  );
};

export default GeneralChartOfAccount;

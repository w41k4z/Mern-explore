/* MODULES */
import { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";
import Form from "../../../../components/form/Form";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";

interface GeneralChartOfAccountProps {
  society: Society;
  ceo: UserAccount;
}
const GeneralChartOfAccount = ({
  society,
  ceo,
}: GeneralChartOfAccountProps) => {
  /* HOOKS SECTION */
  const [chartOfAccounts, setCharOfAccounts] = useState<ChartOfAccount[]>([]);
  useEffect(() => {
    if (society._id) {
      fetchAllChartOfAccount();
    }
  }, [society._id]);

  /* LOGIC */
  const fetchAllChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/all-chart-of-account", formData)
      .then((res) => {
        setCharOfAccounts(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const uploadChartOfAccount = async (csvFile: File) => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        fetchAllChartOfAccount();
      })
      .catch((error) => {
        alert(error);
      });
  };

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
            input: (
              <input
                type="hidden"
                className="form-control"
                id="chartOfAccountID"
                value={row._id}
                required
              />
            ),
          },
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
      data={chartOfAccounts}
      dataPropIDName={"_id"}
      title={"General chart of account"}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalForm={addModalForm}
      updateModalForm={updateModalForm}
      uploadCall={uploadChartOfAccount}
    />
  );
};

export default GeneralChartOfAccount;

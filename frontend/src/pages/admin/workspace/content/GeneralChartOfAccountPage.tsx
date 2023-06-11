/* MODULES */
import { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";

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
const GeneralChartOfAccountPage = ({
  society,
  ceo,
}: GeneralChartOfAccountProps) => {
  /* HOOKS SECTION */
  const [chartOfAccounts, setChartOfAccounts] = useState<ChartOfAccount[]>([]);
  useEffect(() => {
    if (society._id) {
      fetchAllChartOfAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  const [newChartOfAccount, setNewChartOfAccount] = useState<ChartOfAccount>(
    {} as ChartOfAccount
  );
  const [chartOfAccountToUpdate, setChartOfAccountToUpdate] =
    useState<ChartOfAccount>({} as ChartOfAccount);

  /* LOGIC */
  const fetchAllChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/all-chart-of-account", formData)
      .then((res) => {
        setChartOfAccounts(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("accountNumber", newChartOfAccount.accountNumber);
    formData.append("entitled", newChartOfAccount.entitled);
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/create", formData)
      .then((res) => {
        const allChartOfAccount = [...chartOfAccounts, res.data];
        setChartOfAccounts(allChartOfAccount);
        setNewChartOfAccount({} as ChartOfAccount);
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
  const updateChartOfAccount = async (chartOfAccount: ChartOfAccount) => {
    chartOfAccountToUpdate._id = chartOfAccount._id;
    chartOfAccountToUpdate.accountNumber = chartOfAccount.accountNumber;
    if (chartOfAccountToUpdate.entitled === undefined)
      chartOfAccountToUpdate.entitled = chartOfAccount.entitled;
    const formData = new FormData();
    formData.append("entitled", chartOfAccountToUpdate.entitled);
    formData.append("chartOfAccountID", chartOfAccountToUpdate._id);
    await Axios.post("/api/chart-of-account/update", formData)
      .then((res) => {
        chartOfAccounts.forEach((account, index) => {
          if (account._id === chartOfAccount._id) {
            chartOfAccounts[index] = chartOfAccountToUpdate;
          }
        });
        setChartOfAccountToUpdate({} as ChartOfAccount);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const deleteChartOfAccount = async (chartOfAccount: ChartOfAccount) => {
    const formData = new FormData();
    formData.append("chartOfAccountID", chartOfAccount._id);
    await Axios.post("/api/chart-of-account/delete", formData)
      .then((res) => {
        const allChartOfAccount = chartOfAccounts.filter(
          (account) => account._id !== chartOfAccount._id
        );
        setChartOfAccounts(allChartOfAccount);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* ELEMENT */
  const addModalFormInputs = [
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
          onChange={(event) => {
            newChartOfAccount.accountNumber = event.target.value;
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
            newChartOfAccount.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];
  const updateModalFormInputs = (row: ChartOfAccount) => [
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
          onChange={(event) => {
            chartOfAccountToUpdate.accountNumber = event.target.value;
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
            chartOfAccountToUpdate.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];

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
      addModalFormInputs={addModalFormInputs}
      onAdd={addChartOfAccount}
      onUpdate={updateChartOfAccount}
      onDelete={deleteChartOfAccount}
      updateModalFormInputs={updateModalFormInputs}
      uploadCall={uploadChartOfAccount}
    />
  );
};

export default GeneralChartOfAccountPage;

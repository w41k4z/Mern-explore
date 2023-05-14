/* MODULES */
import { useEffect, useState } from "react";
import Axios from "../../../../http-client-side/Axios";

/* COMPONENT */
import { TableColumn } from "../../../../components/datatable/TableColumn";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ThirdPartyChartOfAccount } from "../../../../models/thirdPartyChartOfAccount";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";

interface ThirdPartyChartOfAccountProps {
  society: Society;
  ceo: UserAccount;
}
const ThirdPartyChartOfAccountPage = ({
  society,
  ceo,
}: ThirdPartyChartOfAccountProps) => {
  /* HOOKS SECTION */
  const [thirdPartyChartOfAccounts, setThirdPartyChartOfAccounts] = useState<
    ThirdPartyChartOfAccount[]
  >([]);
  useEffect(() => {
    if (society._id) {
      fetchAllThirdPartyChartOfAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [society._id]);
  const [newThirdPartyChartOfAccount, setNewThirdPartyChartOfAccount] =
    useState<ThirdPartyChartOfAccount>({} as ThirdPartyChartOfAccount);
  const [
    thirdPartyChartOfAccountToUpdate,
    setThirdPartyChartOfAccountToUpdate,
  ] = useState<ThirdPartyChartOfAccount>({} as ThirdPartyChartOfAccount);

  /* LOGIC */
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

  const addThirdPartyChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    formData.append("type", newThirdPartyChartOfAccount.type);
    formData.append("account", newThirdPartyChartOfAccount.account);
    formData.append("entitled", newThirdPartyChartOfAccount.entitled);
    await Axios.post("/api/third-party-chart-of-account/create", formData)
      .then((res) => {
        const allThirdPartyChartOfAccount = [
          ...thirdPartyChartOfAccounts,
          res.data,
        ];
        setThirdPartyChartOfAccounts(allThirdPartyChartOfAccount);
        setNewThirdPartyChartOfAccount({} as ThirdPartyChartOfAccount);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const uploadThirdPartyChartOfAccount = async (csvFile: File) => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("societyID", society._id);
    await Axios.post("/api/third-party-chart-of-account/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        fetchAllThirdPartyChartOfAccount();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const updateThirdPartyChartOfAccount = async (
    thirdPartyChartOfAccount: ThirdPartyChartOfAccount
  ) => {
    thirdPartyChartOfAccountToUpdate._id = thirdPartyChartOfAccount._id;
    thirdPartyChartOfAccountToUpdate.account = thirdPartyChartOfAccount.account;
    if (thirdPartyChartOfAccountToUpdate.type === undefined) {
      thirdPartyChartOfAccountToUpdate.type = thirdPartyChartOfAccount.type;
    }
    if (thirdPartyChartOfAccountToUpdate.entitled === undefined) {
      thirdPartyChartOfAccountToUpdate.entitled =
        thirdPartyChartOfAccount.entitled;
    }
    const formData = new FormData();
    formData.append(
      "thirdPartyChartOfAccountID",
      thirdPartyChartOfAccountToUpdate._id
    );
    formData.append("entitled", thirdPartyChartOfAccountToUpdate.entitled);
    formData.append("account", thirdPartyChartOfAccountToUpdate.account);
    formData.append("type", thirdPartyChartOfAccountToUpdate.type);
    await Axios.post("/api/third-party-chart-of-account/update", formData)
      .then((res) => {
        thirdPartyChartOfAccounts.forEach((account, index) => {
          if (account._id === thirdPartyChartOfAccount._id) {
            thirdPartyChartOfAccounts[index] = thirdPartyChartOfAccountToUpdate;
          }
        });
        setThirdPartyChartOfAccountToUpdate({} as ThirdPartyChartOfAccount);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const deleteThirdPartyChartOfAccount = async (
    thirdPartyChartOfAccount: ThirdPartyChartOfAccount
  ) => {
    const formData = new FormData();
    formData.append("thirdPartyChartOfAccountID", thirdPartyChartOfAccount._id);
    await Axios.post("/api/third-party-chart-of-account/delete", formData)
      .then((res) => {
        const allThirdPartyChartOfAccount = thirdPartyChartOfAccounts.filter(
          (account) => account._id !== thirdPartyChartOfAccount._id
        );
        setThirdPartyChartOfAccounts(allThirdPartyChartOfAccount);
      })
      .catch((error) => {
        alert(error);
      });
  };

  /* ELEMENT */
  const addModalFormInputs = [
    {
      label: (
        <label htmlFor="type" className="form-label">
          Type
        </label>
      ),
      input: (
        <select
          className="form-select"
          id="type"
          onChange={(event) => {
            newThirdPartyChartOfAccount.type = event.target.value;
          }}
          required
        >
          <option>Choose type</option>
          <option value="FO">FO</option>
          <option value="CL">CL</option>
        </select>
      ),
    },
    {
      label: (
        <label htmlFor="account" className="form-label">
          Account
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="account"
          onChange={(event) => {
            newThirdPartyChartOfAccount.account = event.target.value;
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
            newThirdPartyChartOfAccount.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];
  const updateModalFormInputs = (row: ThirdPartyChartOfAccount) => [
    {
      input: (
        <input
          type="hidden"
          className="form-control"
          id="thirdPartyChartOfAccountID"
          value={row._id}
          required
        />
      ),
    },
    {
      label: (
        <label htmlFor="type" className="form-label">
          Type
        </label>
      ),
      input: (
        <select
          className="form-select"
          id="type"
          defaultValue={row.type}
          onChange={(event) => {
            thirdPartyChartOfAccountToUpdate.type = event.target.value;
          }}
          required
        >
          <option value="FO">FO</option>
          <option value="CL">CL</option>
        </select>
      ),
    },
    {
      label: (
        <label htmlFor="account" className="form-label">
          Account
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="account"
          value={row.account}
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
            thirdPartyChartOfAccountToUpdate.entitled = event.target.value;
          }}
          required
        />
      ),
    },
  ];

  /* CONST DATA */
  const columns: TableColumn[] = [
    {
      name: "Type",
      propTarget: "type",
      format: "default",
    },
    {
      name: "Account",
      propTarget: "account",
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
      data={thirdPartyChartOfAccounts}
      dataPropIDName={"_id"}
      title={"Third party chart of account"}
      hasImportCsv
      hasExportPdf
      indexedRow
      addModalFormInputs={addModalFormInputs}
      onAdd={addThirdPartyChartOfAccount}
      onUpdate={updateThirdPartyChartOfAccount}
      onDelete={deleteThirdPartyChartOfAccount}
      updateModalFormInputs={updateModalFormInputs}
      uploadCall={uploadThirdPartyChartOfAccount}
    />
  );
};

export default ThirdPartyChartOfAccountPage;

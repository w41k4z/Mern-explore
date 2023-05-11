/* MODULES */
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { BiEditAlt, BiTrash } from "react-icons/bi";

/* STYLE */
import "../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";
import BasicCRUDTable from "../../../../components/datatable/BasicCRUDTable";

const GeneralChartOfAccount = () => {
  /* HOOKS SECTION */
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
    ];
    setCharOfAccounts(data);
  }, []);

  /* CONST DATA */
  const columns: TableColumn<ChartOfAccount>[] = [
    {
      name: "Account number",
      selector: (row) => row.accountNumber,
      sortable: true,
    },
    {
      name: "Entitled",
      selector: (row) => row.entitled,
      sortable: true,
    },
    {
      cell: (row) => (
        <div className="btn-group">
          <button
            className="btn btn-warning"
            onClick={() => /*handleEdit(row)*/ null}
          >
            <BiEditAlt />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => /*handleRemove(row) */ null}
          >
            <BiTrash />
          </button>
        </div>
      ),
      right: true,
    },
  ];

  return (
    <BasicCRUDTable
      columns={columns}
      data={chartOfAccounts}
      title={"General chart of account"}
      toFilter={["accountNumber", "entitled"]}
    />
  );
};

export default GeneralChartOfAccount;

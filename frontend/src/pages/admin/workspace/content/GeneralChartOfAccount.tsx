/* MODULES */
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { BiDownArrowAlt, BiEditAlt, BiTrash, BiPlus } from "react-icons/bi";

/* STYLE */
import "../../../../../assets/css/generalChartOfAccount.css";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";

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
    setFilteredChartOfAccounts(data);
  }, []);
  const [filteredChartOfAccounts, setFilteredChartOfAccounts] = useState<
    ChartOfAccount[]
  >([]);

  /* STYLES */
  const datatableStyle = {
    table: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#000",
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderBottom: "1px solid #959090",
      },
    },
    cells: {
      style: {
        color: "#000",
        fontSize: "1rem",
      },
    },
  };

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

  /* HANDLERS */
  const handleFilter = (filter: string) => {
    setFilteredChartOfAccounts(
      filter === ""
        ? chartOfAccounts
        : chartOfAccounts.filter((chartOfAccount) => {
            return (
              chartOfAccount.entitled
                .toLowerCase()
                .includes(filter.toLowerCase()) ||
              chartOfAccount.accountNumber
                .toLowerCase()
                .startsWith(filter.toLowerCase())
            );
          })
    );
  };

  return (
    <div className="m-4 bg-white">
      <div className="d-flex justify-content-between p-3">
        <h3>General chart of account</h3>
        <div className="d-flex align-items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Filter..."
            onChange={(event) => {
              handleFilter(event.target.value);
            }}
            className="rounded border-1 p-2"
            style={{ height: "35px" }}
          />
          <BiPlus className="add-button mx-1" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredChartOfAccounts}
        fixedHeader
        customStyles={datatableStyle}
        striped
        responsive
        sortIcon={<BiDownArrowAlt />}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationPerPage={5}
        noDataComponent={
          <p
            className="p-4"
            style={{
              fontSize: "20px",
            }}
          >
            <b>Records empty</b>
          </p>
        }
      />
    </div>
  );
};

export default GeneralChartOfAccount;

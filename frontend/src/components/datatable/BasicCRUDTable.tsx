/* MODULES */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiDownArrowAlt, BiPlus } from "react-icons/bi";

interface BasicCRUDTableProps {
  columns: any[];
  data: any[];
  title: string;
  toFilter?: string[];
}

const BasicCRUDTable = ({
  columns,
  data,
  title,
  toFilter,
}: BasicCRUDTableProps) => {
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  useEffect(() => {
    setFilteredItems(data);
  }, [data]);

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

  /* HANDLERS */
  const handleFilter = (filter: string) => {
    setFilteredItems(
      filter === ""
        ? data
        : data.filter((item) => {
            if (toFilter == null) {
              for (const key in item) {
                if (
                  item[key]
                    .toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                ) {
                  return true;
                }
              }
              return false;
            } else {
              for (const key in item) {
                if (toFilter.includes(key)) {
                  if (
                    item[key]
                      .toString()
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  ) {
                    return true;
                  }
                }
              }
              return false;
            }
          })
    );
  };

  return (
    <div className="m-4 bg-white">
      <div className="d-flex flex-column flex-md-row justify-content-md-between p-3">
        <h3>{title}</h3>
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
        data={filteredItems}
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

export default BasicCRUDTable;

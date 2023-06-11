import React from "react";

const GeneralLedger = () => {
  return (
    <div className="table-responsive">   
        <h1 className="text-center"> General ledger</h1>

        <table className="table table-striped">
          <thead className="table table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Account Number</th>
              <th scope="col">Entitled</th>
            </tr>
          </thead>
          <tbody className="px-2">
            <tr>
              <th>1.</th>
              <th>2</th>
              <th>3</th>
            </tr>

          </tbody>
        </table>
    </div>
  )
};

export default GeneralLedger;

/* MODULES */
import React from "react";
import Form from "../../../../global/form/Form";

interface InformationProps {
  society: {
    name: string;
    ceo: {
      name: string;
      firstName?: string;
      birthdate: Date;
      email: string;
      phoneNumber?: string;
      password: string;
    };
    logo: string;
    password: string;
    object: string;
    address: string;
    headquarters: string;
    creationDate: Date;
    taxIdentificationNumber?: string;
    statisticalNumber?: string;
    commercialRegisterNumber?: string;
    status?: string;
    startDateOfAccountingPeriod: Date;
  };
}

const Information = ({ society }: InformationProps) => {
  /* HOOKS SECTION */

  /* ELEMENT SECTIONS */
  const inputs = [
    {
      bootstrapClass: "col-sm-6",
      label: (
        <label htmlFor="companyName" className="form-label">
          Company name
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="companyName"
          value={society.name}
          required
        />
      ),
      invalidErrorMessage: "Please enter a valid company name.",
    },
    {
      bootstrapClass: "col-sm-6",
      label: (
        <label htmlFor="address" className="form-label">
          Address
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="address"
          value={society.address}
          required
        />
      ),
      invalidErrorMessage: "Please enter a valid address.",
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="creationDate" className="form-label">
          Creation date
        </label>
      ),
      input: (
        <input
          type="date"
          className="form-control"
          id="creationDate"
          /*value={society.creationDate}*/ required
        />
      ),
      invalidErrorMessage: "Please choose a valid date.",
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="creationDate" className="form-label">
          Start date of accounting period
        </label>
      ),
      input: (
        <input
          type="date"
          className="form-control"
          id="creationDate"
          /*value={society.startDateOfAccountingPeriod}*/ required
        />
      ),
      invalidErrorMessage: "Please choose a valid date.",
    },
    {
      bootstrapClass: "col-12",
      label: (
        <label htmlFor="object" className="form-label">
          Object
        </label>
      ),
      input: (
        <textarea className="form-control" id="object" required>
          {society.object}
        </textarea>
      ),
      invalidErrorMessage: "Please insert a valid society object.",
    },
    {
      bootstrapClass: "col-12",
      label: (
        <label htmlFor="headquarters" className="form-label">
          Headquarters
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="headquarters"
          value={society.headquarters}
          required
        />
      ),
      invalidErrorMessage: "Please insert a valid headquarters.",
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="tin" className="form-label">
          Tax identification number
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="tin"
          value={society.taxIdentificationNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="stn" className="form-label">
          Statistical number
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="stn"
          value={society.statisticalNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="crgn" className="form-label">
          Commercial register number
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="crgn"
          value={society.commercialRegisterNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-6",
      label: (
        <label htmlFor="status" className="form-label">
          Status
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="status"
          value={society.status}
        />
      ),
    },
  ];
  const validButton = (
    <div className="form-footer d-flex justify-content-end mt-3">
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </div>
  );

  return (
    <div className="card">
      <div className="card-body">
        <div className="py-5 text-center">
          <h2>{society.name}</h2>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">CEO</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">Name</h6>
                  <small className="text-muted text-end">
                    {society.ceo.name}
                  </small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">First Name</h6>
                  <small className="text-muted text-end">
                    {society.ceo.firstName}
                  </small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">BirthDay</h6>
                  <small className="text-muted text-end">
                    <>{society.ceo.birthdate.toString}</>
                  </small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">Address</h6>
                  <small className="text-muted text-end">
                    {society.address}
                  </small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">Phone Number</h6>
                  <small className="text-muted text-end">
                    {society.ceo.phoneNumber}
                  </small>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <Form
              inputs={inputs}
              action={"."}
              method={"POST"}
              validButton={validButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;

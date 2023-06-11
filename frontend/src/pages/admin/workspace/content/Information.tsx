/* MODULES */
import React from "react";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";

/* COMPONENT */
import Form from "../../../../components/form/Form";

interface InformationProps {
  society: Society;
  ceo: UserAccount;
  images: {
    [key: string]: string;
  };
}
const Information = ({ society, ceo, images }: InformationProps) => {
  /* HOOKS */

  /* ELEMENT */
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
          defaultValue={society.name}
          required
        />
      ),
      invalidErrorMessage: "Please enter a valid company name.",
    },
    {
      bootstrapClass: "col-sm-6",
      label: (
        <label htmlFor="address" className="form-label">
          Headquarters
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="address"
          defaultValue={society.headquarters}
          required
        />
      ),
      invalidErrorMessage: "Please enter a valid address.",
    },
    {
      bootstrapClass: "col-md-6",
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
      bootstrapClass: "col-md-6",
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
        <textarea
          className="form-control"
          id="object"
          defaultValue={society.object}
          rows={3}
          required
        />
      ),
      invalidErrorMessage: "Please insert a valid society object.",
    },
    {
      bootstrapClass: "col-12",
      label: (
        <label htmlFor="headquarters" className="form-label">
          Address
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          id="headquarters"
          defaultValue={society.address}
          required
        />
      ),
      invalidErrorMessage: "Please insert a valid headquarters.",
    },
    {
      bootstrapClass: "col-md-6",
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
          defaultValue={society.taxIdentificationNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-md-6",
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
          defaultValue={society.statisticalNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-md-6",
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
          defaultValue={society.commercialRegisterNumber}
        />
      ),
    },
    {
      bootstrapClass: "col-md-6",
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
          defaultValue={society.status}
        />
      ),
    },
  ];

  const validButton = (
    <div className="form-footer d-flex justify-content-end mt-3">
      <button className="btn btn-lg btn-primary" type="submit">
        Save
      </button>
    </div>
  );

  return (
    <div className="card m-4">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-around align-items-center pb-3">
          <img
            className="rounded-circle shadow-4-strong"
            src={images[society.logo]}
            alt="Logo"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              minWidth: "100px",
              minHeight: "100px",
            }}
          />
          <div className="mt-sm-5 col-md-4 order-md-last">
            <h4 className="d-flex justify-content-center align-items-center mb-3">
              <span className="text-primary">CEO</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">Name</h6>
                  <small className="text-muted text-end">{ceo.name}</small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">First Name</h6>
                  <small className="text-muted text-end">{ceo.firstName}</small>
                </div>
              </li>
              <li className="list-group-item">
                <div>
                  <h6 className="my-0">BirthDay</h6>
                  <small className="text-muted text-end">
                    <>{ceo.birthdate}</>
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
                    {ceo.phoneNumber}
                  </small>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Form
          inputs={inputs}
          action={"."}
          method={"POST"}
          validButton={validButton}
        />
      </div>
    </div>
  );
};

export default Information;

/* MODULES */
import { Route, Routes } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

/* COMPONENTS */
import SidePanel from "../../../components/global/panel/SidePanel";
import Information from "./content/Information";
import Files from "./content/Files";
import FinancialStatement from "./content/FinancialStatement";
import GeneralChartOfAccount from "./content/GeneralChartOfAccount";
import ThirdPartyChartOfAccount from "./content/ThirdPartyChartOfAccount";
import GeneralLedger from "./content/GeneralLedger";
import JournalCode from "./content/JournalCode";
import JournalTransactionRecord from "./content/JournalTransactionRecord";

/* STATIC DATA */
import { AdminSidePanelContent } from "./staticData/AdminSidePanel";

/* STYLES */
import "../../../../assets/css/AdminPanel.css";

const AdminPanel = () => {
  const assets = require.context("../../../../assets/upload/logo", true);

  interface Images {
    [key: string]: string;
  }

  const images: Images = {};
  assets.keys().forEach((filename: string) => {
    const image: string = assets(filename);
    const name: string = filename.replace("./", "");
    images[name] = image;
  });

  /* CONST DATA */
  const society = {
    name: "DIMPEX",
    ceo: {
      name: "Rakoto",
      firstName: "Admin",
      birthdate: new Date(),
      email: "admin@gmail.com",
      phoneNumber: "034 00 000 00",
      password: "12345678",
    },
    logo: "perusahaan.png",
    password: "12345678",
    object:
      "Dago Import Export est dans la place Huhu Dunno what to put here, just some random text Lorem Ipsum",
    address: "Antananarivo",
    headquarters: "Ensceinte ITU Andoharanofotsy",
    creationDate: new Date(),
    taxIdentificationNumber: undefined,
    statisticalNumber: undefined,
    commercialRegisterNumber: undefined,
    status: undefined,
    startDateOfAccountingPeriod: new Date(),
  };

  /* HOOKS SECTION */

  /* HANDLERS SECTION */

  /* ELEMENTS SECTION */

  /* LOGIC SECTION */
  AdminSidePanelContent.map((item) => {
    item.onItemClick = () => {
      console.log(item.title + " clicked");
    };
    return 0;
  });

  const AdminSidePanelHeader = (
    <div className="d-flex justify-content-center align-items-center mb-3 mb-md-0 me-md-auto">
      <img
        src={images[society.logo]}
        className="img-fluid"
        width={40}
        height={40}
        alt="Sary"
      />
      <span className="fs-4 ms-md-4 d-none d-md-block">{society.name}</span>
    </div>
  );

  return (
    <div className="d-flex admin-panel">
      <SidePanel
        header={AdminSidePanelHeader}
        panelItems={AdminSidePanelContent}
      />
      <div className="main-content">
        <header
          id="header"
          className="sticky-top header d-flex justify-content-end px-4 py-2 bg-light"
        >
          <a
            href="/ela-admin/society/disconnect"
            className="logout dropdown float-right"
          >
            <span className="d-flex align-items-center">
              {society.name} <BiPowerOff className="ms-2"></BiPowerOff>
            </span>
          </a>
        </header>
        <Routes>
          <Route
            path="/info"
            element={<Information society={society} images={images} />}
          />
          <Route path="/files" element={<Files />} />
          <Route path="/financial-statement" element={<FinancialStatement />} />
          <Route
            path="/chart-of-account/general"
            element={<GeneralChartOfAccount />}
          />
          <Route
            path="/chart-of-account/third-party"
            element={<ThirdPartyChartOfAccount />}
          />
          <Route path="/general-ledger" element={<GeneralLedger />} />
          <Route path="/journal/code" element={<JournalCode />} />
          <Route
            path="/journal/transaction-record"
            element={<JournalTransactionRecord />}
          />
        </Routes>
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="footer p-3 mt-4 text-center bg-light">
                  Developed By:
                  <span className="text-info font-weight-normal"> DIMPEX</span>
                  , Using <i className="fab fa-react" /> React JS &amp; Redux JS
                  integrated with external movies data API
                  <a
                    href="http://www.omdbapi.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OMDB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPanel;

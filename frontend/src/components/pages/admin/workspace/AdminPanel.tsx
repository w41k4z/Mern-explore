/* MODULES */
import { Route, Routes } from "react-router-dom";

/* COMPONENTS */
import SidePanel from "../../../global/panel/SidePanel";
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

const AdminPanel = () => {
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
    logo: "huhu.png",
    password: "12345678",
    object: "Dago Import Export",
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
    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
      <img src="" alt="Sary" />
      <span className="fs-4 ms-2">Sidebar</span>
    </div>
  );

  return (
    <>
      <header id="header" className="header">
        <div className="top-left">
          <div className="navbar-header">
            <a className="navbar-brand" href="./">
              <img src="/static/images/logo.png" alt="Logo" />
            </a>
            <a className="navbar-brand hidden" href="./">
              <img src="/static/images/logo2.png" alt="Logo" />
            </a>
            <a id="menuToggle" className="menutoggle" href="./">
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </div>
        <div className="top-right">
          <div className="header-menu">
            <a
              href="/ela-admin/society/disconnect"
              className="logout dropdown float-right"
            >
              {society.name} <i className="fa fa-power-off"></i>
            </a>
          </div>
        </div>
      </header>
      <div className="d-flex">
        <SidePanel
          header={AdminSidePanelHeader}
          panelItems={AdminSidePanelContent}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/society/info"
              element={<Information society={society} />}
            />
            <Route path="/society/files" element={<Files />} />
            <Route
              path="/society/financial-statement"
              element={<FinancialStatement />}
            />
            <Route
              path="/society/chart-of-account/general"
              element={<GeneralChartOfAccount />}
            />
            <Route
              path="/society/chart-of-account/third-party"
              element={<ThirdPartyChartOfAccount />}
            />
            <Route path="/society/general-ledger" element={<GeneralLedger />} />
            <Route path="/society/journal/code" element={<JournalCode />} />
            <Route
              path="/society/journal/transaction-record"
              element={<JournalTransactionRecord />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

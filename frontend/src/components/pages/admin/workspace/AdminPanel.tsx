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
    <div className="d-flex">
      <SidePanel
        header={AdminSidePanelHeader}
        panelItems={AdminSidePanelContent}
      />
      <Routes>
        <Route path="/society/info" element={<Information />} />
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
  );
};

export default AdminPanel;

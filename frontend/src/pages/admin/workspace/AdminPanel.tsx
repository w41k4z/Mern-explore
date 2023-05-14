/* MODULES */
import { Route, Routes } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

/* COMPONENTS */
import SidePanel from "../../../components/panel/SidePanel";
import Information from "./content/Information";
import FinancialStatement from "./content/FinancialStatement";
import GeneralChartOfAccountPage from "./content/GeneralChartOfAccountPage";
import ThirdPartyChartOfAccountPage from "./content/ThirdPartyChartOfAccountPage";
import GeneralLedger from "./content/GeneralLedger";
import ReferenceDocumentPage from "./content/ReferenceDocumentPage";
import JournalCodePage from "./content/JournalCodePage";
import JournalTransactionRecordPage from "./content/JournalTransactionRecordPage";

/* TYPE */
import { Society } from "../../../models/society";
import { UserAccount } from "../../../models/userAccount";

/* STATIC DATA */
import { AdminSidePanelContent } from "./staticData/AdminSidePanelContent";

/* STYLES */
import "../../../assets/css/AdminPanel.css";
import { useEffect, useState } from "react";
import Axios from "../../../http-client-side/Axios";

const AdminPanel = () => {
  /* HOOKS */
  const [society, setSociety] = useState<Society>({} as Society);
  const [ceo, setCeo] = useState<UserAccount>({} as UserAccount);
  useEffect(() => {
    fetchProd();
  }, []);

  /* IMAGES */
  const assets = require.context("../../../assets/upload/logo", true);
  interface Images {
    [key: string]: string;
  }
  const images: Images = {};
  assets.keys().forEach((filename: string) => {
    const image: string = assets(filename);
    const name: string = filename.replace("./", "");
    images[name] = image;
  });

  /* LOGIC */
  const fetchProd = async () => {
    await Axios.post("/api/society/prod")
      .then(async (res1) => {
        setSociety(res1.data);
        const formData = new FormData();
        formData.append("ceoID", res1.data.ceo);
        await Axios.post("/api/user-account/user", formData)
          .then((res2) => {
            setCeo(res2.data);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

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
        currentPageIndex={1}
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
            path="/"
            element={
              <Information society={society} ceo={ceo} images={images} />
            }
          />
          <Route path="/financial-statement" element={<FinancialStatement />} />
          <Route
            path="/chart-of-account/general"
            element={<GeneralChartOfAccountPage society={society} ceo={ceo} />}
          />
          <Route
            path="/chart-of-account/third-party"
            element={
              <ThirdPartyChartOfAccountPage society={society} ceo={ceo} />
            }
          />
          <Route path="/general-ledger" element={<GeneralLedger />} />
          <Route
            path="/journal/reference-document"
            element={<ReferenceDocumentPage society={society} ceo={ceo} />}
          />
          <Route
            path="/journal/code"
            element={<JournalCodePage society={society} ceo={ceo} />}
          />
          <Route
            path="/journal/transaction-record"
            element={
              <JournalTransactionRecordPage society={society} ceo={ceo} />
            }
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

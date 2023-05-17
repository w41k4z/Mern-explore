import React, { useEffect, useState } from 'react'
import Axios from "../../../../http-client-side/Axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* STYLES */
import "../../../../assets/css/balance.css";
import { BiPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BsDownload, BsUpload, BsFilter } from "react-icons/bs";

/* TYPE */
import { ChartOfAccount } from "../../../../models/chartOfAccount";
import { Society } from "../../../../models/society";
import { UserAccount } from "../../../../models/userAccount";
import { Journal } from '../../../../models/journal';
import { all } from 'axios';

interface BalanceProps {
  society: Society;
  ceo: UserAccount;
}
const Balance = ({society,ceo}: BalanceProps) => {
  /* HOOKS */
  const [generalAccounts, setGeneralAccounts] = useState<ChartOfAccount[]>([])
  const [journals, setJournals] = useState<Journal[]>([]);
  useEffect(() => {
    fetchAllChartOfAccount();
    fetchAllJournal();
  }, [society._id])
  const [balance, setBalance] = useState<{
    generalAccount: string;
    entitled: string;
    sumDebit: number;
    sumCredit: number
  }[]>([])
  useEffect(()=> {
    getBalance();
  }, [generalAccounts, journals])

  /* LOGIC */
  const fetchAllChartOfAccount = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/chart-of-account/all-chart-of-account", formData)
      .then((res) => {
        setGeneralAccounts(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const fetchAllJournal = async () => {
    const formData = new FormData();
    formData.append("societyID", society._id);
    await Axios.post("/api/journal/all-journal", formData)
      .then((res) => {
        setJournals(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getBalance = () => {
    const allAccount: {
      generalAccount: string;
      entitled: string;
      sumDebit: number;
      sumCredit: number
    }[] = [];

    generalAccounts.map(account => {
      const toPush = {
        generalAccount: account.accountNumber,
        entitled: account.entitled,
        sumDebit: 0,
        sumCredit: 0
      };
      journals.map(journal => {
        journal.details.map(detail => {
          if(detail.generalAccount === account.accountNumber) {
            toPush.sumDebit += detail.debit ? detail.debit : 0; 
            toPush.sumCredit += detail.credit ? detail.credit : 0; 
          }
        })
      });
      allAccount.push(toPush)
    })

    setBalance(allAccount);
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const docTitle = "Balance";
    const headers = [["Account number","Entitled","Sum Debit","Sum Credit","Sold Debtor","Sold Creditor"]];

    const data = balance.map((account) =>
      [account.generalAccount, account.entitled, account.sumCredit, account.sumDebit, account.sumDebit-account.sumCredit > 0 ? account.sumDebit-account.sumCredit : 0,(account.sumDebit-account.sumCredit)*(-1) > 0 ? (account.sumDebit-account.sumCredit)*(-1) : 0 ]
    );

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(docTitle, marginLeft, 40);
    autoTable(doc, content);
    doc.save(`${docTitle}.pdf`);
  };

  

  return (
    <div className="table-responsive">
      <div className="m-4 bg-white">
      <div className="action d-flex justify-content-end">
              <button
                className="btn btn-outline-dark d-flex align-items-center"
                onClick={exportPDF}
              >
                <BsDownload style={{ fontSize: "20px" }} className="me-2" />{" "}
                Export pdf
              </button>
          </div>
       </div>
        <table className='table table-striped'>
           <thead className='px-2 table-bordered table-dark'>
           
                <tr className="text-white" >
                  <th scope="col">#.</th>
                    <th scope="col">Account number</th>
                    <th scope="col">Entitled</th>
                    <th colSpan={2} className='colspan'>
                        <table className="tab">
                          <tr>
                              <th colSpan={2} className='text-center'>Sum</th>
                          </tr>
                              <tr>
                                  <th className="text-center">Debit</th>
                                  <th className="text-center">Credit</th>
                              </tr>
                          </table>
                    </th>
                    <th colSpan={2} className='colspan'>
                        <table className="tab">
                          <tr>
                              <th colSpan={2}><center>Sold</center></th>
                          </tr>
                              <tr>
                                  <th className="text-center">Debtor</th>
                                  <th className="text-center">Creditor</th>
                              </tr>
                          </table>
                    </th>
                  </tr>
           </thead>
           <tbody className="px-2">
           {
              balance.map((account,index) => {
                return (
                <tr>    
                  <th>{index+1}.</th>          
                  <td className="text-center">{account.generalAccount}</td>
                  <td className="text-center">{account.entitled}</td>
                  <td className="text-center">{account.sumDebit}</td>
                  <td className="text-center">{account.sumCredit}</td>
                  <td className="text-center">{account.sumDebit-account.sumCredit > 0 ? account.sumDebit-account.sumCredit : 0}</td>
                  <td className="text-center">{(account.sumDebit-account.sumCredit)*(-1) > 0 ? (account.sumDebit-account.sumCredit)*(-1) : 0}</td>
                </tr>
    )
              } )
            }
            
           </tbody>
        </table>
    </div>
  )
}
export default Balance
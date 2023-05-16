/* STYLES */
import "../../../../assets/css/balance.css";
import React from 'react'


const Balance = () => {
  return (
    <div className="table-responsive">
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
            <tr>    
              <th>1.</th>          
              <td className="text-center">1</td>
              <td className="text-center">2</td>
              <td className="text-center">3</td>
              <td className="text-center">4</td>
              <td className="text-center">5</td>
              <td className="text-center">6</td>
            </tr>

           </tbody>
        </table>
    </div>
  )
}
export default Balance
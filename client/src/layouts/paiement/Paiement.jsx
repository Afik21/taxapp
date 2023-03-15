import '../agent/agent.css'
import React, { useState } from 'react'
import { BsPlusCircleDotted, BiRefresh, BsFillLockFill, BsFillUnlockFill, FaCamera, FaEye, FaAngleLeft, FaAngleRight, MdPayments} from '../../middleware/imports-icons'


export default function Paiement() {
  return (
    <div className='wrapper height padding'>
      <div className="wrapper layout-head">
        <h4><MdPayments/> <span>Paiements</span></h4>
      </div>
      <div className="wrapper layout-content">
        <div className="wrapper table">
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Date</th>
                <th>Propriétaire</th>
                <th>Montant ($)</th>
                <th>Canal</th>
                <th>Statut</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#CDF214</td>
                <td>09/08/2022</td>
                <td>AZERTY - QWERTY</td>
                <td>50</td>
                <td>Carte Bancaire</td>
                <td><span className="status status__active">Validé</span></td>
                <td>
                  <ul>
                    <li>
                      <button className="status__pending">
                        <FaEye />
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="loading-frame">
            <div className="ring"></div>
            <span>loading...</span>
          </div> */}
        </div>
        <div className="wrapper table-pagination">
          <ul>
            <li><button><FaAngleLeft /></button></li>
            <li>page<span>1</span>sur<span>10</span>pages</li>
            <li><button><FaAngleRight /></button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

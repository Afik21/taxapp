import React, { useState } from "react";
import "./dashboard.css";
import { MdOutlineDashboard } from "../../middleware/imports-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Analyse d'identification et paiements",
      },
    },
  };

  const labels = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Identification",
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: "rgba(255,99,132,0.5)",
      },
      {
        label: "Paiement",
        data: [10, 20, 30, 9, 23, 51],
        backgroundColor: "rgba(53,162,235,0.5)",
      },
    ],
  };

  return (
    <div className="wrapper height padding dashbord-l">
      <div className="wrapper layout-head">
        <h4>
          <MdOutlineDashboard /> <span>Tableau de Bord</span>
        </h4>
      </div>
      <div className="wrapper layout-content">
        <div className="resume">
          <div className="resume-item">
            <h3>5</h3>
            <p>Utilisateurs</p>
          </div>
          <div className="resume-item">
            <h3>5</h3>
            <p>Type de propriétés</p>
          </div>
          <div className="resume-item">
            <h3>5</h3>
            <p>QrCodes activés</p>
          </div>
          <div className="resume-item">
            <h3>5</h3>
            <p>QrCodes non activés</p>
          </div>
        </div>
        <div className="display-flex justify-space-between">
          <div className="trans-left-state">
            <div className="left-state-head wrapper display-flex align-items">
              <h4>Paiement</h4>
              <form action="">
                <select name="" id="">
                  <option name="J" id="">
                    Journalier
                  </option>
                  <option name="M" id="">
                    Mansuel
                  </option>
                </select>
              </form>
            </div>
            <div className="left-state-chart wrapper">
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="trans-rigth-state">
            <div className="balance-state padding">
              <ul>
                <li>
                  <h3>$20.129</h3>
                </li>
                <li>
                  <span>Août 2022</span>
                </li>
                <li>
                  <h4>Balance Totale</h4>
                </li>
              </ul>
            </div>
            <div className="trans-history wrapper">
              <h4>Dernière Transactions</h4>
              <hr />
              <div className="trans-history-item display-flex justify-space-between align-items padding">
                <ul>
                  <li>
                    <h5>Reason</h5>
                  </li>
                  <li>
                    <span>09 Août 2022</span>
                  </li>
                </ul>
                <h3>$20.192</h3>
              </div>
              <div className="trans-history-item display-flex justify-space-between align-items padding">
                <ul>
                  <li>
                    <h5>Reason</h5>
                  </li>
                  <li>
                    <span>09 Août 2022</span>
                  </li>
                </ul>
                <h3>$20.192</h3>
              </div>
              <div className="trans-history-item display-flex justify-space-between align-items padding">
                <ul>
                  <li>
                    <h5>Reason</h5>
                  </li>
                  <li>
                    <span>09 Août 2022</span>
                  </li>
                </ul>
                <h3>$20.192</h3>
              </div>
              <div className="trans-history-item display-flex justify-space-between align-items padding">
                <ul>
                  <li>
                    <h5>Reason</h5>
                  </li>
                  <li>
                    <span>09 Août 2022</span>
                  </li>
                </ul>
                <h3>$20.192</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

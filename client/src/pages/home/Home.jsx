import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
// import PaymentConsult from '../payconsult/PaymentConsult'
import { BsCheck2All, BsPhone } from "../../middleware/imports-icons";
import "./home.css";

const APK_FILE_URL = "http://localhost:3000/e-tax.apk";
const APK_FILE_IMG = "http://localhost:3000/dgrk.jpeg";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const downloadFileAtUrl = (url) => {
    // fetch(url)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const blobUrl = window.URL.createObjectURL(new Blob(blob));
    //     const fileName = url.split("/").pop();
    //     const aTag = document.createElement("a");
    //     aTag.href = blobUrl;
    //     aTag.setAttribute("download", fileName);
    //     document.body.appendChild(aTag);
    //     aTag.click();
    //     aTag.remove();
    //   });

    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>e-Taxe | Home</title>
        <link rel="canonical" href="https://e-taxe.com/" />
      </Helmet>
      <Header />
      <div className="wrapper banner">
        <div className="container-100">
          <div className="banner-cover">
            <div className="banner-content">
              <p>
                Etant entité économique, je suis identifié par hôtel de ville;
                et
              </p>
              <p>En toute assurance et sécurité, je paie :</p>
              <div className="banner-text">
                <h2>Ma patante ;</h2>
                <h2>Mon taxe sur l'environnement ;</h2>
                <h2>Mon retenu sur le loyer ; et</h2>
                <h2>Mon taxe d'assainissement.</h2>
              </div>
              <div className="ruban display-flex">
                <Link to="/payment" className="ruban-1">
                  Effectuer un paiement
                </Link>
                <Link to="" className="ruban-2" onClick={() => setIsOpen(true)}>
                  Consulter mes paiements
                </Link>
                <button
                  className="ruban-1"
                  onClick={() => {
                    downloadFileAtUrl(APK_FILE_IMG);
                  }}
                >
                  <BsPhone /> Télécharger l'application mobile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper pay-steps">
        <div className="container-90 margin-auto">
          <h3>Payez votre taxe en trois étapes simple</h3>
          <div className="container-100 margin-auto steps-container display-flex justify-space-between">
            <div className="step-item">
              <span>
                <BsCheck2All />
              </span>
              <h2>#1</h2>
              <p>Cliquez sur le button</p>
              <h3>Effectuer un paiement</h3>
              <p>Pour obtenir le formulaire de paiement.</p>
            </div>
            <div className="step-item">
              <span>
                <BsCheck2All />
              </span>
              <h2>#2</h2>
              <p>Remplissez le formulaire</p>
              <h3>Fournir l'identifiant de votre propriété</h3>
              <p>
                Plusieurs options de paiement : <b>Carte de crédit</b>,{" "}
                <strong>Mobile Money</strong>
              </p>
            </div>
            <div className="step-item">
              <span>
                <BsCheck2All />
              </span>
              <h2>#3</h2>
              <p>Confirmez paiement</p>
              <h3>Inserez le code reçu par SMS</h3>
              <p>
                Un sms vous serait envoyé dans le numéro associé à votre carte
                bancaire ou le numéro mobile fournit.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper partnership">
        <div className="container-90 margin-auto">
          <h3>Partenaires officiel</h3>
          <div className="container-90 partners-container display-flex margin-auto justify-center">
            <div className="partner-item">
              <img
                src={window.location.origin + "/assets/images/Kinshasa.png"}
                alt="logo-img"
              />
            </div>
            <div className="partner-item">
              <img
                src={window.location.origin + "/assets/images/jade.jpg"}
                alt="logo-img"
              />
            </div>
            <div className="partner-item">
              <img
                src={window.location.origin + "/assets/images/dgr-kin.jpg"}
                alt="logo-img"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <Modal
        contentLabel="Agent form"
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {setIsOpen(false)}}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: {
            color: 'inherit',
            width: '90%',
            height: 'auto',
            maxHeight: '90%',
            margin: 'auto',
            padding: '0',
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        <div className="modal_header">
          <h4>Paiement</h4>
          <span className="modal_close" onClick={() => setIsOpen(false)}>
            &times;
          </span>
        </div>
        <div className="model__container container-80 margin-auto">
          <PaymentConsult/>
        </div>
      </Modal> */}
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { BsCheckCircle, MdOutlineCancel } from "../../middleware/imports-icons";
import "./payment.css";
export default function Payment() {
  const [toggleState, setToggleState] = useState(1);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const next = () => {
    if (step == 4) {
      setStep(4);
    }
    setStep((prev) => prev + 1);
  };

  let steps = {
    0: (
      <div className="wrapper pay-verify">
        <form action="" method="post" className="wrapper display-flex">
          <div className="wrapper v-search display-flex justify-space-between align-end">
            <div>
              <label htmlFor="">Numéro d'Identification</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Tapez le numéro d'identification de votre propriété."
              />
            </div>
            <button type="submit" className="button normal" onClick={next}>
              Vérifier
            </button>
          </div>
          {message != "" ? (
            <div className="wrapper message-box message-box-success">
              <span>Message</span>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    ),
    1: (
      <>
        <div className="wrapper prop-infos padding">
          <table>
            <tr>
              <td>Identifiant du propriété</td>
              <td>:</td>
              <td>
                <span>AZERTY</span>
              </td>
            </tr>
            <tr>
              <td>Titre du propriété</td>
              <td>:</td>
              <td>
                <span>AZERTY</span>
              </td>
            </tr>
            <tr>
              <td>Type du propriété</td>
              <td>:</td>
              <td>
                <span>AZERTY</span>
              </td>
            </tr>
            <tr>
              <td>Nom du propriétaire</td>
              <td>:</td>
              <td>
                <span>AZERTY</span>
              </td>
            </tr>
          </table>
        </div>
        <button type="button" className="button normal" onClick={next}>
          Suivant
        </button>
      </>
    ),
    2: (
      <div className="wrapper pay-form padding">
        <form action="" method="post" className="wrapper">
          <div className="wrapper pay-options display-flex justify-space-between">
            <div>
              <label htmlFor="">Type de Taxe</label>
              <select name="" id="">
                <option value="">Choisir</option>
                <option value="">Patante</option>
                <option value="">Vignette</option>
              </select>
            </div>
            <div>
              <h3>Moyen de Paiement</h3>
              <div className="pay-mode display-flex justify-space-between">
                <div
                  onClick={() => toggleTab(1)}
                  className={toggleState === 1 ? "pay-mode-selected" : ""}
                >
                  Carte à crédit
                </div>
                <div
                  onClick={() => toggleTab(2)}
                  className={toggleState === 2 ? "pay-mode-selected" : ""}
                >
                  Mobile Money
                </div>
              </div>
            </div>
          </div>
          {toggleState === 1 ? (
            <div
              className={
                toggleState === 1
                  ? "wrapper card-pay display-flex justify-space-between"
                  : "disabled"
              }
            >
              <div>
                <label htmlFor="">Prénom</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Nom</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Numéro de Carte de Crédit</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Code de Sécurité</label>
                <input type="text" name="" id="" />
              </div>
              <div>
                <label htmlFor="">Date d'expiration</label>
                <input type="text" name="" id="" />
              </div>
            </div>
          ) : (
            <div
              className={
                toggleState === 2
                  ? "wrapper card-pay display-flex justify-space-between"
                  : "disabled"
              }
            >
              <div>
                <label htmlFor="">Numéro de Téléphone</label>
                <input type="text" name="" id="" />
              </div>
            </div>
          )}
          <div className="wrapper card-pay display-flex justify-space-between">
            <label htmlFor="">Raison (Résumé)</label>
            <textarea
              name=""
              id=""
              cols=""
              rows=""
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="wrapper">
            <div className="btn-submit">
              <button
                type="submit"
                className="button primary__blue-sky"
                onClick={next}
              >
                Proceder au paiement
              </button>
            </div>
          </div>
        </form>
      </div>
    ),
    3: (
      <div className="wrapper pay-verify">
        <form action="" method="post" className="wrapper display-flex">
          <div className="wrapper v-search conf-pay display-flex justify-space-between align-end">
            <div>
              <label htmlFor="">
                Saisissez le code reçu pas SMS pour confirmer le paiement
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Tapez le numéro d'identification de votre propriété."
              />
            </div>
            <button
              type="submit"
              className="button primary__green"
              onClick={next}
            >
              Confirmer le paiement
            </button>
          </div>
        </form>
      </div>
    ),
    4: (
      <div className="wrapper">
        <div className="pay-process pay-success">
          <h3>Paiement réussi!</h3>
          <BsCheckCircle className="icon" />
          <p>Votre processus de paiement a abouti avec succès.</p>
          <ul>
            <li>Order Id : 0123456</li>
            <li>Reference : 9876543210</li>
            <li>
              Amount : <span>$20.00</span>
            </li>
          </ul>
        </div>
        {/* <div className="pay-process pay-failed">
          <h3>Paiement Echoué!</h3>
          <MdOutlineCancel className="icon" />
          <p>Votre processus de paiement a échoué.</p>
        </div> */}
      </div>
    ),
  };

  return (
    <div className="wrapper payment display-flex justify-center align-items">
      <div className="container">
        <div className="wrapper pay-head display-flex justify-center align-end">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/dgrk.jpeg"}
              alt="logo-img"
              className="logo"
            />
          </Link>
          <ul>
            <li>
              <h3>Effectuez votre Paiement</h3>
            </li>
            <li>
              <p>En toute sécurité...</p>
            </li>
          </ul>
        </div>
        {steps[step]}
      </div>
    </div>
  );
}

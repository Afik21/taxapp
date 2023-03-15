import {Link} from '../../middleware/imports'
import '../pay/payment.css'
export default function PaymentConsult() {
  return (
    <div className="wrapper payment display-flex justify-center align-items">
      <div className="wrapper">
        <div className="wrapper pay-head display-flex justify-center align-end">
            <Link to="/">
                <img
                    src={process.env.PUBLIC_URL + '/dgrk.jpeg'}
                    alt="logo-img"
                    className="logo"
                />
            </Link>
            <ul>
                <li><h3>Paiement effectués</h3></li>
                <li><p>Historique</p></li>
            </ul>
        </div>
        <div className="wrapper pay-verify">
            <form action="" method="post" className="wrapper display-flex">
                <div className="wrapper v-search display-flex justify-space-between align-end">
                    <div>
                        <label htmlFor="">Numéro d'Identification</label>
                        <input type="text" name="" id="" placeholder="Tapez le numéro d'identification de votre propriété." />
                    </div>
                    <button type="submit" className='button normal'>Vérifier</button>
                </div>
                <div className="wrapper message-box message-box-success">
                    <span>Message</span>
                </div>
            </form>
        </div>
        <div className="pay-historic display-flex justify-space-between">
            <div className="historic-item display-flex justify-space-between">
                <ul>
                    <li><h3>Patante</h3></li>
                    <li><span>14/08/2022</span></li>
                    <li><span>Carte à crédit</span></li>
                </ul>
                <ul>
                    <li><h2>$0</h2></li>
                    <li><span className='consult consult-success'>Réussi</span></li>
                </ul>
            </div>
            <div className="historic-item display-flex justify-space-between">
                <ul>
                    <li><h3>Patante</h3></li>
                    <li><span>14/08/2022</span></li>
                    <li><span>Carte à crédit</span></li>
                </ul>
                <ul>
                    <li><h2>$0</h2></li>
                    <li><span className='consult consult-failed'>Echoué</span></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}
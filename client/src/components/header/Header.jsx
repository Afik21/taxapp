import { Link } from 'react-router-dom'
import './header.css'
export default function Header() {
  return (
    <div className="wrapper header">
      <div className="container-90 margin-auto display-flex justify-space-between align-items">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/dgrk.jpeg'}
            alt="logo-img"
            className="logo"
          />
        </Link>
        <div>
          <Link to="/payment" className="btn btn-secondary">
            Effectuer un paiement
          </Link><Link to="/login" className="btn btn-main">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  )
}

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import './login.css'

function ResetPassword() {
  return (
    <div>
      <Header />
      <div className="wrapper logins">
        <div className="container-80 margin-auto display-flex justify-center align-items">
          <div className="log__right">
            <h2>New password</h2>
            <p>Put your new passwords and validate.</p>
            <form action="" method="post">
              <div className="input__div">
                <input
                  type="password"
                  className="input__form"
                  placeholder=" "
                  value=""
                  name="userpassword"
                  id="userpwd"
                />
                <label htmlFor="userpassword" className="label__form">
                  Password
                </label>
                <label htmlFor="userpassword" className="label__icon"></label>
              </div>
              <div className="input__div">
                <input
                  type="password"
                  className="input__form"
                  placeholder=" "
                  value=""
                  name="userpassword"
                  id="userpwd"
                />
                <label htmlFor="userpassword" className="label__form">
                  Confirm password
                </label>
                <label htmlFor="userpassword" className="label__icon"></label>
              </div>
              <div className="btn__wrapper">
                <button type="button" name="btnlogin" className="normal__aims">
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPassword

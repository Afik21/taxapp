import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./login.css";
import { useForm } from "react-hook-form";
import axios from "../../middleware/http-common";
import useAuth from "../../hooks/useAuth";
import Modal from "react-modal";
import { USER_LOGIN } from "../../services/services";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({ mode: "onTouched" });

  const { isSubmitting } = formState;

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await wait(1000);
      //
      const response = await axios.post(USER_LOGIN, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const user = response?.data.userInfo;
      const accessToken = response?.data.accessToken;
      console.log({ "user login data : ": response?.data });

      if (response?.data.islogged) {
        setIsAuth(response?.data.islogged);
        setMessage(response?.data.message);
        setAuthStatus(1);
      }

      const timer = setTimeout(() => {
        setIsAuth(!response?.data.islogged);
        setAuthStatus(0);
        //
        setAuth({ user, accessToken });
        // navigate(from, {replace: true})
        navigate("/user", { replace: true });
      }, 6000);
      return () => clearTimeout(timer);
    } catch (error) {
      if (!error?.response) {
        setIsAuth(true);
        setAuthStatus(2);
        setMessage("No server response");
        const timer = setTimeout(() => {
          setIsAuth(false);
          setAuthStatus(0);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (error.response?.status === 400) {
        setIsAuth(!error?.response.data.islogged);
        setAuthStatus(2);
        setMessage(error?.response?.data.message);
        const timer = setTimeout(() => {
          setIsAuth(error?.response?.data.islogged);
          setAuthStatus(0);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (error.response?.status === 401) {
        setIsAuth(true);
        setAuthStatus(2);
        setMessage("Unauthorized");
        const timer = setTimeout(() => {
          setIsAuth(false);
          setAuthStatus(0);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setIsAuth(true);
        setAuthStatus(2);
        setMessage("Login failed");
        const timer = setTimeout(() => {
          setIsAuth(false);
          setAuthStatus(0);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>e-Taxe | Se connecter</title>
        <link rel="canonical" href="https://e-taxe.com/" />
      </Helmet>
      <Header />
      <div className="wrapper logins">
        <div className="container-80 margin-auto display-flex justify-center align-items">
          <div className="log__right">
            <h2>Se connecter</h2>
            <p>Bienvenue dans système de paiement de taxe.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isAuth ? (
                authStatus === 1 ? (
                  <div className="wrapper padding login-message lm-succes">
                    <span>{message}</span>
                  </div>
                ) : (
                  <div className="wrapper padding login-message lm-failed">
                    <span>{message}</span>
                  </div>
                )
              ) : (
                <></>
              )}

              <div className="input__div">
                <input
                  type="text"
                  className="input__form"
                  placeholder=" "
                  autoComplete="none"
                  {...register("username", {
                    required:
                      "Veuillez renseigner votre nom d'utilisateur ou téléphone",
                    minLength: {
                      value: 3,
                      message:
                        "Le nom d'utilisateur doit contenir au moins 3 caractères",
                    },
                  })}
                />
                <label htmlFor="username" className="label__form">
                  E-mail
                </label>
                <label htmlFor="username" className="label__icon"></label>
                {errors.username && <span>{errors.username.message}</span>}
              </div>
              <div className="input__div">
                <input
                  type="password"
                  className="input__form"
                  placeholder=" "
                  autoComplete="none"
                  {...register("password", { required: true, minLength: 3 })}
                />
                <label htmlFor="password" className="label__form">
                  Password
                </label>
                <label htmlFor="userpassword" className="label__icon"></label>
                {errors.password && (
                  <span>Veuillez renseigner votre mot de passe</span>
                )}
              </div>
              <div className="input__more">
                <Link to="" onClick={() => setIsOpen(true)}>
                  Recovery Password
                </Link>
              </div>
              <div className="btn__wrapper">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  name="btnlogin"
                  className="secondary-blue"
                >
                  Login
                </button>
              </div>
            </form>
            <Modal
              isOpen={isOpen}
              shouldCloseOnOverlayClick={false}
              onRequestClose={() => setIsOpen(false)}
              style={{
                overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 11 },
                content: {
                  color: "inherit",
                  width: "50%",
                  height: "50%",
                  margin: "auto",
                  padding: "0",
                },
              }}
            >
              <div className="wrapper">
                <div className="modal-header container-90 margin-auto display-flex justify-space-between align-items">
                  <h2>Forgot Password?</h2>
                  <span
                    className="btn modal-close"
                    onClick={() => setIsOpen(false)}
                  >
                    &times;
                  </span>
                </div>
                <div className="container-90 margin-auto">
                  <p>
                    Enter your AIMS email address and we’ll send you
                    instructions to reset your password.
                  </p>
                  <p>
                    For security reasons, we do NOT store your password. So rest
                    assured that we will never send your password via email.
                  </p>
                  <form action="" method="post">
                    <div className="input__div">
                      <input
                        type="text"
                        className="input__form"
                        placeholder=" "
                        value=""
                        name="username"
                        id="userid"
                      />
                      <label htmlFor="username" className="label__form">
                        E-mail
                      </label>
                      <label htmlFor="username" className="label__icon"></label>
                    </div>
                    <div className="btn__wrapper">
                      <button
                        type="button"
                        name="btnlogin"
                        className="normal__aims"
                      >
                        Send reset instructions
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

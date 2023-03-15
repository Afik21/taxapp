import "./qrcode.css";
import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import LoadingOne from "../../components/loading/LoadingOne";
import { MdQrCodeScanner } from "../../middleware/imports-icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  GET_QRCODES,
  CREATE_QRCODES,
  GET_QRCODES_KEY,
  GET_QRCODES_PRINT,
} from "../../services/services";
import { isEmpty } from "../../utils/Utils";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};
const QrCode = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [qrcodes, setQrcodes] = useState();
  const [qrcodesPrint, setQrcodesPrint] = useState();
  const [count_start, setCountStart] = useState(0);
  const [count_limit, setCountLimit] = useState(12);
  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
    formState: formState,
  } = useForm({ mode: "onTouched" });
  const { isSubmitting } = formState;
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    formState: formState2,
  } = useForm({ mode: "onTouched" });
  const {
    reset: reset3,
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    formState: formState3,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getQrCodes = async () => {
      try {
        const response = await axiosPrivate.get(
          GET_QRCODES,
          {
            params: { count_start, count_limit },
          },
          {
            signal: controller.signal,
          }
        );
        isMounted && setQrcodes(response?.data);
        setLoading(false);
      } catch (error) {
        if (!error?.response) {
        } else if (error.response?.status === 400) {
        } else if (error.response?.status === 401) {
        } else {
        }
      }
    };
    getQrCodes();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // console.log({ "try to survey qcodes count_start ": count_start });
  // console.log({ "try to survey qcodes count_limit ": count_limit });

  const handleScroll = () => {
    // console.log(
    //   "height : ",
    //   document.getElementById("qr-content").scrollHeight
    // );
    // console.log("Top : ", document.getElementById("qr-content").scrollTop);
    // // console.log("Window : ", window.innerHeight);
    // console.log(
    //   "Window : ",
    //   document.getElementById("qr-content").clientHeight
    // );
    // if (
    //   document.getElementById("qr-content").clientHeight +
    //     document.getElementById("qr-content").scrollTop +
    //     1 >=
    //   document.getElementById("qr-content").scrollHeight
    // ) {
    //   setLoading(true);
    //   setCountStart(count_start + 12);
    //   setCountLimit(count_limit + 12);
    //   // setQrcodes((prev) => prev + 1);
    // } else {
    //   setCountStart(count_start - 12);
    //   setCountLimit(count_limit - 12);
    // }
  };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // document
    //   .getElementById("qr-content")
    //   .addEventListener("scroll", handleScroll);
    // return () =>
    //   document
    //     .getElementById("qr-content")
    //     .removeEventListener("scroll", handleScroll);
  }, []);

  const onSearch = async (data) => {
    try {
      await wait(1000);
      //
      const key = data.code;
      const response = await axiosPrivate.get(GET_QRCODES_KEY + `/${key}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setQrcodes(response?.data);
    } catch (error) {
      if (!error?.response) {
      } else if (error.response?.status === 400) {
      } else if (error.response?.status === 401) {
      } else {
      }
    }
  };

  const onPrint = async (data) => {
    try {
      await wait(1000);
      //
      const start = data.start;
      const end = data.end;
      const response = await axiosPrivate.get(
        GET_QRCODES_PRINT,
        { params: { start, end } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setQrcodesPrint(response?.data);
    } catch (error) {
      if (!error?.response) {
      } else if (error.response?.status === 400) {
      } else if (error.response?.status === 401) {
      } else {
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSending(true);
      await wait(1000);

      const response = await axiosPrivate.post(CREATE_QRCODES, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response?.data.status === 1) {
        setMessage(response?.data.message);
        setIsAuth(true);
        setAuthStatus(1);
      }

      setQrcodesPrint(response?.data);
      setIsSending(false);
      const timer = setTimeout(() => {
        setIsAuth(false);
        setAuthStatus(0);
        reset3({
          key: "",
        });
      }, 5000);
      return () => clearTimeout(timer);
    } catch (error) {
      if (!error?.response) {
      } else if (error.response?.status === 400) {
      } else if (error.response?.status === 401) {
      } else {
      }
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "QrCodes-Printing",
    onAfterPrint: () => console.log("print success"),
  });

  const marginTop = "10px";
  const marginRight = "5px";
  const marginBottom = "10px";
  const marginLeft = "5px";
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  return (
    <div className="wrapper height padding">
      <div className="wrapper layout-head">
        <h4>
          <MdQrCodeScanner /> <span>QrCodes</span>
        </h4>
      </div>
      <div className="wrapper layout-content">
        <div className="wrapper qr-head display-flex justify-space-between">
          <div className="qr-form-search">
            <form
              key={1}
              onSubmit={handleSubmit(onSearch)}
              className="display-flex justify-space-between"
            >
              <div className="input__div">
                <input
                  type="text"
                  className="input__form"
                  placeholder=" "
                  autoComplete="none"
                  {...register("code", {
                    required: "Veuillez renseigner le code",
                  })}
                />
                <label htmlFor="code" className="label__form">
                  Tapez le code du Propriété
                </label>
                {errors.code && <span>{errors.code.message}</span>}
              </div>
              <button type="submit">Recherche</button>
            </form>
          </div>
          <div className="qr-actions">
            <button onClick={() => setIsOpen(true)}>Imprimer</button>
            <button onClick={() => setIsOpen2(true)}>Générer</button>
          </div>
        </div>
        <div id="qr-content" className="qr-content display-flex">
          {isEmpty(qrcodes?.qrcodes) ? (
            <div className="wrapper display-flex justify-center"></div>
          ) : (
            qrcodes?.qrcodes.map((qrItem, j) => {
              return (
                <Link to="" key={qrItem?.id} className="qr-item display-flex">
                  <div className="qr-code">
                    <QRCode value={qrItem?.code} renderAs="canvas" />
                  </div>
                  <ul>
                    <li>
                      <h3>{qrItem?.code}</h3>
                    </li>
                    <li>
                      {qrItem?.statut === 1 ? (
                        <span style={{ color: "green" }}>Activé</span>
                      ) : (
                        <span style={{ color: "red" }}>Non Activé</span>
                      )}
                    </li>
                  </ul>
                </Link>
              );
            })
          )}
          <div className="wrapper display-flex justofy-center">
            {loading && <LoadingOne />}
          </div>
        </div>
      </div>
      <Modal
        contentLabel="Agent form"
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 10 },
          content: {
            color: "inherit",
            width: "90%",
            height: "97%",
            margin: "auto",
            padding: "0",
            transition: "all 0.3s ease-in-out",
            zIndex: "10",
          },
        }}
      >
        <div className="modal_header">
          <h4>Impression QrCodes</h4>
          <span className="modal_close" onClick={() => setIsOpen(false)}>
            &times;
          </span>
        </div>
        <div className="model__container container-90 margin-auto">
          <div className="wrapper form-print display-flex justify-space-between">
            <form
              key={2}
              onSubmit={handleSubmit2(onPrint)}
              className="display-flex justify-space-between"
            >
              <div className="input__div">
                <input
                  type="text"
                  className="input__form"
                  placeholder=" "
                  autoComplete="none"
                  {...register2("start", {
                    required: "Veuillez renseigner le début de l'interval",
                  })}
                />
                <label htmlFor="start" className="label__form">
                  Début de l'interval
                </label>
                <label htmlFor="start" className="label__icon"></label>
                {errors2.start && <span>{errors2.start.message}</span>}
              </div>
              <div className="input__div">
                <input
                  type="text"
                  className="input__form"
                  placeholder=" "
                  autoComplete="none"
                  {...register2("end", {
                    required: "Veuillez renseigner la fin de l'interval",
                  })}
                />
                <label htmlFor="end" className="label__form">
                  Fin de l'interval
                </label>
                <label htmlFor="start" className="label__icon"></label>
                {errors2.end && <span>{errors2.end.message}</span>}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="button primary__blue"
              >
                Rechercher
              </button>
            </form>
            <button style={{ padding: "3px" }} onClick={handlePrint}>
              Lancer l'Impression
            </button>
          </div>
          <div
            ref={componentRef}
            className="wrapper qrcodes-print-container display-flex"
          >
            <style>{getPageMargins()}</style>
            {isEmpty(qrcodesPrint?.qrcodes) ? (
              <div className="m-auto">{qrcodesPrint?.qrcodes?.message}</div>
            ) : (
              qrcodesPrint?.qrcodes.map((item, k) => {
                return (
                  <div key={k} className="qrcodes-print-item">
                    <div className="qrcodes-print-item-up wrapper">
                      <img src={process.env.PUBLIC_URL + "/dgrk.jpeg"} alt="" />
                      <h3>E-Taxe</h3>
                      <h4>{item?.code}</h4>
                    </div>
                    <div className="qrcodes-print-item-bottom wrapper">
                      <QRCode
                        value={item?.code}
                        renderAs="canvas"
                        // size={256}
                        style={{
                          height: "100%",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Modal>
      <Modal
        contentLabel="Agent form"
        isOpen={isOpen2}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setIsOpen2(false);
        }}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 10 },
          content: {
            color: "inherit",
            width: "60%",
            height: "70%",
            margin: "auto",
            padding: "0",
            transition: "all 0.3s ease-in-out",
            zIndex: "10",
          },
        }}
      >
        <div className="modal_header">
          <h4>Générer les QrCodes</h4>
          <span className="modal_close" onClick={() => setIsOpen2(false)}>
            &times;
          </span>
        </div>
        <div className="model__container container-90 margin-auto form-cont">
          <form key={3} onSubmit={handleSubmit3(onSubmit)}>
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
                {...register3("key", {
                  required:
                    "Veuillez renseigner le nombre de QrCodes à générer.",
                  pattern: {
                    value: /^[1-9]+[0-9]*$/,
                    message: "Entrer une valide",
                  },
                  min: {
                    value: 1,
                    message: "la valeur ne peut être inferieure à 1.",
                  },
                })}
              />
              <label htmlFor="key" className="label__form">
                Nombre de QrCodes
              </label>
              <label htmlFor="key" className="label__icon"></label>
              {errors3.key && <span>{errors3.key.message}</span>}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="button primary__blue"
            >
              Générer
            </button>
          </form>
          {isSending ? (
            <div className="wrapper form-loader display-flex justify-center">
              <LoadingOne />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default QrCode;

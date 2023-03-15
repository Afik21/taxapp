import "./prop-bien-details.css";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import QRCode from "qrcode.react";
import {
  MdOutlineArrowBackIosNew,
  BsPlusCircleDotted,
  FaArchive,
  MdQrCodeScanner,
  BiDetail,
} from "../../middleware/imports-icons";
import townships from "../../middleware/township.json";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  GET_PROPERTYS_TYPE,
  GET_PROPERTYS_KEY,
  CREATE_PROPERTY,
} from "../../services/services";
import { isEmpty } from "../../utils/Utils";
import { useForm } from "react-hook-form";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export default function PropBienDetails() {
  let { key } = useParams();
  const { userTmpData } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [propertys, setPropertys] = useState();
  const [propTypes, setPropTypes] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onTouched",
    defaultValues: { user_id: key },
  });
  const { isSubmitting } = formState;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPropTypes = async () => {
      try {
        const response = await axiosPrivate.get(GET_PROPERTYS_TYPE, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          signal: controller.signal,
        });
        isMounted && setPropTypes(response?.data);
      } catch (error) {
        if (!error?.response) {
        } else if (error.response?.status === 400) {
        } else if (error.response?.status === 401) {
        } else {
        }
      }
    };
    getPropTypes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProperties = async () => {
      try {
        const response = await axiosPrivate.get(GET_PROPERTYS_KEY + `/${key}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          signal: controller.signal,
        });
        isMounted && setPropertys(response?.data);
      } catch (error) {
        if (!error?.response) {
        } else if (error.response?.status === 400) {
        } else if (error.response?.status === 401) {
        } else {
        }
      }
    };
    getProperties();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      await wait(1000);
      //
      // const formData = new FormData();
      // formData.append("user_id", data.user_id);
      // formData.append("property_type_id", data.property_type_id);
      // formData.append("title", data.title);
      // formData.append("immatriculation", data.immatriculation);
      // formData.append("address", data.address);
      // formData.append("rccm", data.rccm);
      // formData.append("description", data.description);
      // formData.append("photo", data.photo);
      //
      const response = await axiosPrivate.post(CREATE_PROPERTY, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response?.data.status === 1) {
        setMessage(response?.data.message);
        setIsAuth(true);
        setAuthStatus(1);
      }

      const timer = setTimeout(() => {
        setIsAuth(false);
        setAuthStatus(0);
      }, 5000);
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
        setIsAuth(true);
        setAuthStatus(2);
        setMessage(error?.response?.data.message);
        const timer = setTimeout(() => {
          setIsAuth(false);
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
        setMessage("Process failed");
        const timer = setTimeout(() => {
          setIsAuth(false);
          setAuthStatus(0);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  };

  return (
    <div className="wrapper height padding">
      <div className="wrapper prop-bien-det-head">
        <Link
          to="/user/prop-bien"
          className="display-flex align-items"
          style={{ textDecoration: "none" }}
        >
          <MdOutlineArrowBackIosNew /> retour
        </Link>
      </div>
      <div className="prop-bien-det-content wrapper display-flex justify-space-between">
        <div className="det-content-left padding">
          <h3>Information sur le propriétaire</h3>
          {userTmpData?.userDatas?.users.map((user, i) => {
            return (
              user?.id == key && (
                <>
                  <div className="det-content-left-actions display-flex">
                    <button>Bloquer</button>
                    <button>Modifier</button>
                    <button>Imprimer</button>
                  </div>
                  <div className="prop-img">
                    <img
                      //   src={window.location.origin + "/user.png"}
                      src={"http://localhost:5500/imgs/" + user?.photo}
                      alt="logo-img"
                    />
                  </div>
                  <div className="wrapper prop-details">
                    <table>
                      <tr>
                        <td>Code</td>:
                        <td>
                          <span>{user?.id}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Noms</td>:
                        <td>
                          <span>{user?.names}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Genre</td>:
                        <td>
                          <span>{user?.sexe}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Téléphone</td>:
                        <td>
                          <span>{user?.telephone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>E-Mail</td>:
                        <td>
                          <span>{user?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Date de naissance</td>:
                        <td>
                          <span>{user?.birth}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </>
              )
            );
          })}
        </div>
        <div className="det-content-rigth padding">
          <h3>Information sur les Biens</h3>
          <div className="btn-property">
            <button onClick={() => setIsOpen(true)} className="button normal">
              <BsPlusCircleDotted /> <span>Nouveau Bien</span>
            </button>
          </div>
          <div className="wrapper property-container display-flex justify-space-between">
            {isEmpty(propertys?.propertys) ? (
              <div
                className="wrapper property-container display-flex justify-center"
                style={{ color: "red" }}
              >
                <span>{propertys?.message}</span>
              </div>
            ) : (
              propertys?.propertys.map((property, i) => {
                return propTypes?.typePropertys.map((propertyType, j) => {
                  return (
                    property?.property_type_id == propertyType?.id && (
                      <div className="prop-item" key={i}>
                        <div className="prop-item-top display-flex justify-space-between align-items">
                          <ul>
                            <li>
                              <h3>{property.title}</h3>
                            </li>
                            <li>
                              <span>{propertyType.title}</span>
                            </li>
                          </ul>
                          <span>Date Enreg</span>
                        </div>
                        <div className="prop-item-bottom display-flex justify-space-between">
                          <button>
                            <FaArchive /> <span>Archiver</span>
                          </button>
                          <button>
                            <MdQrCodeScanner /> <span>QR Code</span>
                          </button>
                          <button>
                            <BiDetail /> <span>Details</span>
                          </button>
                        </div>
                      </div>
                    )
                  );
                });
              })
            )}
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
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            color: "inherit",
            width: "60%",
            height: "75%",
            margin: "auto",
            padding: "0",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <div className="modal_header">
          <h4>Ajouter un nouveau propriété</h4>
          <span className="modal_close" onClick={() => setIsOpen(false)}>
            &times;
          </span>
        </div>
        <div className="model__container container-90 margin-auto">
          <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
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
            <div className="agent-form">
              <div className="img">
                <div className="img-div">
                  <QRCode
                    value="https://jade-services.com/"
                    renderAs="canvas"
                  />
                </div>
              </div>
              <div className="infos">
                <input type="hidden" {...register("user_id")} />
                <div className="infos-div">
                  <div className="input__div">
                    <select
                      {...register("property_type_id", {
                        required: "Veuillez renseigner le type de propriété",
                      })}
                    >
                      <option value="" selected="true" disabled="disabled">
                        Type de propriété
                      </option>
                      {isEmpty(propTypes?.typePropertys) ? (
                        <option>{propTypes?.message}</option>
                      ) : (
                        propTypes?.typePropertys.map((propTypeItem, j) => {
                          return (
                            <option value={propTypeItem.id}>
                              {propTypeItem.title}
                            </option>
                          );
                        })
                      )}
                    </select>
                    {errors.property_type_id && (
                      <span>{errors.property_type_id.message}</span>
                    )}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("title", {
                        required: "Veuillez renseigner le titre",
                        minLength: {
                          value: 3,
                          message:
                            "Le titre doit contenir au moins 3 caractères",
                        },
                      })}
                    />
                    <label htmlFor="title" className="label__form">
                      Titre
                    </label>
                    <label htmlFor="title" className="label__icon"></label>
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <select
                      {...register("denomination", {
                        required: "Veuillez renseigner le statut du propriété",
                      })}
                    >
                      <option value="" selected="true" disabled="disabled">
                        Statut
                      </option>
                      <option value="Personne Morale">Personne Morale</option>
                      <option value="Personne Physique">
                        Personne Physique
                      </option>
                    </select>
                    {errors.denomination && (
                      <span>{errors.denomination.message}</span>
                    )}
                  </div>
                </div>

                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("immatriculation")}
                    />
                    <label htmlFor="immatriculation" className="label__form">
                      Numéro Immatriculation
                    </label>
                    <label
                      htmlFor="immatriculation"
                      className="label__icon"
                    ></label>
                    {errors.immatriculation && (
                      <span>{errors.immatriculation.message}</span>
                    )}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("rccm")}
                    />
                    <label htmlFor="rccm" className="label__form">
                      Numéro RCCM
                    </label>
                    <label htmlFor="rccm" className="label__icon"></label>
                    {errors.rccm && <span>{errors.rccm.message}</span>}
                  </div>
                </div>

                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("street_number", {
                        required:
                          "Veuillez renseigner le numéro de la propriété sur l'avenue",
                      })}
                    />
                    <label htmlFor="street_number" className="label__form">
                      Numéro sur l'avenue
                    </label>
                    <label
                      htmlFor="street_number"
                      className="label__icon"
                    ></label>
                    {errors.street_number && (
                      <span>{errors.street_number.message}</span>
                    )}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("street", {
                        required: "Veuillez renseigner le nom de l'avenue",
                      })}
                    />
                    <label htmlFor="street" className="label__form">
                      Avenue
                    </label>
                    <label htmlFor="street" className="label__icon"></label>
                    {errors.street && <span>{errors.street.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("district", {
                        required: "Veuillez renseigner le nom du quartier",
                      })}
                    />
                    <label htmlFor="district" className="label__form">
                      Quartier
                    </label>
                    <label htmlFor="district" className="label__icon"></label>
                    {errors.district && <span>{errors.district.message}</span>}
                  </div>
                </div>

                <div className="infos-div">
                  <div className="input__div">
                    <select
                      {...register("township", {
                        required: "Veuillez renseigner la commune",
                      })}
                    >
                      <option value="" selected="true" disabled="disabled">
                        Commune
                      </option>
                      {townships.map((townItem) => {
                        return (
                          <option value={townItem.township}>
                            {townItem.township}
                          </option>
                        );
                      })}
                    </select>
                    {errors.township && <span>{errors.township.message}</span>}
                  </div>
                </div>

                <div className="infos-div">
                  <div className="input__div">
                    <textarea
                      style={{ resize: "none" }}
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("description")}
                    />
                    <label htmlFor="description" className="label__form">
                      Description
                    </label>
                    <label
                      htmlFor="description"
                      className="label__icon"
                    ></label>
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <div className="btn-item">
                <button className="button primary__danger">Annuler</button>
              </div>
              <div className="btn-item">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="button primary__blue"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

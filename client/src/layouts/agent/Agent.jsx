import "./agent.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  BiUser,
  BsPlusCircleDotted,
  FaCamera,
  FaAngleLeft,
  FaAngleRight,
  FaEye,
  BiRefresh,
  BsFillLockFill,
} from "../../middleware/imports-icons";
import axios from "../../middleware/http-common";
import { GET_USERS, CREATE_USER } from "../../services/services";
import { isEmpty } from "../../utils/Utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export default function Agent() {
  const axiosPrivate = useAxiosPrivate();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [users, setUsers] = useState();
  const [message, setMessage] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({ mode: "onTouched" });
  const { isSubmitting } = formState;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(GET_USERS, {
          signal: controller.signal,
        });
        isMounted && setUsers(response?.data);
      } catch (error) {
        if (!error?.response) {
        } else if (error.response?.status === 400) {
        } else if (error.response?.status === 401) {
        } else {
        }
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      await wait(1000);
      //
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      formData.append("prename", data.prename);
      formData.append("name", data.name);
      formData.append("sexe", data.sexe);
      formData.append("birth", data.birth);
      formData.append("telephone", data.telephone);
      formData.append("email", data.email);
      formData.append("role", data.role);
      //
      const response = await axios.post(CREATE_USER, formData, {
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
        setMessage("Login failed");
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
      <div className="wrapper layout-head">
        <h4>
          <BiUser /> <span>Agents</span>
        </h4>
        <div className="btn">
          <button onClick={() => setIsOpen(true)} className="button normal">
            <BsPlusCircleDotted /> <span>Nouvel</span>
          </button>
        </div>
      </div>
      <div className="wrapper layout-content">
        <div className="wrapper table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Noms</th>
                <th>Téléphone</th>
                <th>Mail</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isEmpty(users?.users) ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      color: "lightslategray",
                      fontSize: "1rem",
                    }}
                  >
                    Aucune information disponible
                  </td>
                </tr>
              ) : (
                users?.users.map((user, i) => {
                  return (
                    user?.role != "user" && (
                      <tr key={user?.id}>
                        <td>{user?.id}</td>
                        <td>{user?.names}</td>
                        <td>{user?.telephone}</td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                        <td>
                          <span
                            className={
                              user?.status === 0
                                ? "status status__inactive"
                                : "status status__active"
                            }
                          >
                            {user?.status === 0 ? "inactif" : "actif"}
                          </span>
                        </td>
                        <td>
                          <ul>
                            <li>
                              <button className="status__pending">
                                <FaEye />
                              </button>
                            </li>
                            <li>
                              <button className="status__inactive">
                                <BiRefresh />
                              </button>
                            </li>
                            <li>
                              <button className="status__pending">
                                <BsFillLockFill />
                              </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    )
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="wrapper table-pagination">
          <ul>
            <li>
              <button>
                <FaAngleLeft />
              </button>
            </li>
            <li>
              page<span>1</span>sur<span>10</span>pages
            </li>
            <li>
              <button>
                <FaAngleRight />
              </button>
            </li>
          </ul>
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
            height: "70%",
            margin: "auto",
            padding: "0",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <div className="modal_header">
          <h4>Ajouter un nouvel Agent</h4>
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
                  <img src={avatar} alt={avatar} />
                  <label htmlFor="">
                    {avatar == null ? "Drag and Drop" : ""}
                  </label>
                </div>
                <div className="file-download-btn">
                  <input
                    type="file"
                    className="input-file"
                    accept="image/*"
                    id="photo"
                    // onChange={(e) => {
                    //   imageHandler(e)
                    // }}
                    {...register("photo")}
                  />
                  <label htmlFor="photo" className="label-file">
                    <FaCamera />
                  </label>
                </div>
              </div>
              <div className="infos">
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("prename", {
                        required: "Veuillez renseigner le prénom",
                        minLength: {
                          value: 2,
                          message:
                            "Le prénom doit contenir au moins 3 caractères",
                        },
                      })}
                    />
                    <label htmlFor="prename" className="label__form">
                      Prénom
                    </label>
                    <label htmlFor="prename" className="label__icon"></label>
                    {errors.prename && <span>{errors.prename.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("name", {
                        required: "Veuillez renseigner le nom",
                        minLength: {
                          value: 2,
                          message: "Le nom doit contenir au moins 3 caractères",
                        },
                      })}
                    />
                    <label htmlFor="name" className="label__form">
                      Nom
                    </label>
                    <label htmlFor="name" className="label__icon"></label>
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <select
                      {...register("sexe", {
                        required: "Veuillez renseigner le sexe",
                      })}
                    >
                      <option selected="true" disabled="disabled">
                        Genre
                      </option>
                      <option value="Femme">Femme</option>
                      <option value="Homme">Homme</option>
                    </select>
                    {errors.sexe && <span>{errors.sexe.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="date"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("birth", {
                        required: "Veuillez renseigner la date de naissance",
                      })}
                    />
                    <label htmlFor="birth" className="label__form">
                      Date de naissance
                    </label>
                    <label htmlFor="birth" className="label__icon"></label>
                    {errors.birth && <span>{errors.birth.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <input
                      type="text"
                      className="input__form"
                      placeholder=" "
                      autoComplete="none"
                      {...register("telephone", {
                        required: "Veuillez renseigner le numéro de téléphone",
                        minLength: {
                          value: 9,
                          message:
                            "Le numéro de téléphone doit contenir au moins 9 chiffre (sans l'indicatif pays)",
                        },
                        maxLength: {
                          value: 14,
                          message:
                            "Le numéro de téléphone doit contenir au plus 14 caractères (avec l'indicatif pays +243 par ex.)",
                        },
                      })}
                    />
                    <label htmlFor="telephone" className="label__form">
                      Téléphone
                    </label>
                    <label htmlFor="telephone" className="label__icon"></label>
                    {errors.telephone && (
                      <span>{errors.telephone.message}</span>
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
                      {...register("email")}
                    />
                    <label htmlFor="email" className="label__form">
                      E-mail
                    </label>
                    <label htmlFor="email" className="label__icon"></label>
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>
                </div>
                <div className="infos-div">
                  <div className="input__div">
                    <select
                      {...register("role", {
                        required: "Veuillez renseigner le rôle",
                      })}
                    >
                      <option selected="true" disabled="disabled">
                        Rôle agent
                      </option>
                      <option value="admin">Administrateur</option>
                      <option value="controller">Contrôleur</option>
                      <option value="collector">Collecteur</option>
                    </select>
                    {errors.role && <span>{errors.role.message}</span>}
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

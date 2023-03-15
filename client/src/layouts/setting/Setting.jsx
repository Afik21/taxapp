import React, { useState, useEffect } from "react";
import "./setting.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaEye,
  BiRefresh,
  BsFillLockFill,
} from "../../middleware/imports-icons";
import { useForm } from "react-hook-form";
import axios from "../../middleware/http-common";
import {
  GET_PROPERTYS_TYPE,
  CREATE_PROPERTYS_TYPE,
} from "../../services/services";
import { isEmpty } from "../../utils/Utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Setting() {
  const [responseStatus, setResponseStatus] = useState(-1);
  const [message, setMessage] = useState("Azerty");
  const [typeProperties, setTypeProperties] = useState();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTypeProperties = async () => {
      try {
        const response = await axiosPrivate.get(GET_PROPERTYS_TYPE, {
          signal: controller.signal,
        });
        isMounted && setTypeProperties(response?.data);
      } catch (error) {
        if (!error?.response) {
        } else if (error.response?.status === 400) {
        } else if (error.response?.status === 401) {
        } else {
        }
      }
    };
    getTypeProperties();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(CREATE_PROPERTYS_TYPE, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response?.data.status === 1) {
        setResponseStatus(response?.data.status);
        setMessage(response?.data.message);
      }

      const timer = setTimeout(() => {
        setResponseStatus(-1);
      }, 5000);
      reset();
      return () => clearTimeout(timer);
    } catch (error) {
      if (!error?.response) {
        setResponseStatus(0);
        setMessage("No server response");
        const timer = setTimeout(() => {
          setResponseStatus(-1);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (error.response?.status === 400) {
        setResponseStatus(error?.response?.data.status);
        setMessage(error?.response?.data.message);
        const timer = setTimeout(() => {
          setResponseStatus(-1);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (error.response?.status === 401) {
        setResponseStatus(error?.response?.data.status);
        setMessage("Unauthorized");
        const timer = setTimeout(() => {
          setResponseStatus(-1);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setResponseStatus(error?.response?.data.status);
        setMessage("Login failed");
        const timer = setTimeout(() => {
          setResponseStatus(-1);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  };

  return (
    <div className="setting-wrapper">
      <div className="title">
        <h2>Paramètre</h2>
        <p>Ajouter, Modifier et enlever les types des entité économiques.</p>
      </div>
      <div className="container">
        <div className="left">
          <h3>Nouvelle entité économique</h3>
          {responseStatus != -1 ? (
            responseStatus === 1 ? (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input__div">
              <input
                type="text"
                className="input__form"
                placeholder=" "
                autoComplete="none"
                {...register("title", {
                  required: "Veuillez renseigner le nom",
                  minLength: {
                    value: 2,
                    message: "Le nom doit contenir au moins 3 caractères",
                  },
                })}
              />
              <label htmlFor="title" className="label__form">
                Nom d'entité (ex. Boutique d'habillement)
              </label>
              <label htmlFor="title" className="label__icon"></label>
              {errors.title && <span>{errors.title.message}</span>}
            </div>
            <div className="input__div">
              <textarea
                type="text"
                className="input__form"
                placeholder=" "
                autoComplete="none"
                {...register("description", {
                  minLength: {
                    value: 2,
                    message: "La description doit contenir au moins 3 mots",
                  },
                })}
              ></textarea>
              <label htmlFor="description" className="label__form">
                Description de l'entité
              </label>
              <label htmlFor="name" className="label__icon"></label>
              {errors.description && <span>{errors.description.message}</span>}
            </div>
            <div className="btn-item">
              <button type="submit" className="button primary__blue">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
        <div className="right">
          <div className="wrapper layout-content">
            <div className="wrapper table">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isEmpty(typeProperties?.typePropertys) ? (
                    <tr>
                      <td
                        colSpan="5"
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
                    typeProperties?.typePropertys.map((typeProp, i) => {
                      return (
                        <tr key={typeProp?.id}>
                          <td>{typeProp?.id}</td>
                          <td>{typeProp?.title}</td>
                          <td>{typeProp?.description}</td>
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
        </div>
      </div>
    </div>
  );
}

export default Setting;

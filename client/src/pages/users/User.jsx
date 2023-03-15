import React, { useEffect, useState } from "react";
import "./user.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "../../routes/NavLink";
import {
  FaUserFriends,
  FaRegEnvelope,
  MdOutlineDashboard,
  MdAttachMoney,
  MdOutlineNotificationsActive,
  MdQrCodeScanner,
  BiUser,
  BiSearch,
  VscSettings,
} from "../../middleware/imports-icons";
import useAuth from "../../hooks/useAuth.js";
import jwt_decode from "jwt-decode";
import useLogout from "../../hooks/useLogout";

function User() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState({});
  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const decoded = auth?.accessToken
      ? jwt_decode(auth.accessToken)
      : undefined;

    setUser({
      birth: decoded?.userInfo?.birth,
      email: decoded?.userInfo?.email,
      gender: decoded?.userInfo?.gender,
      photo: decoded?.userInfo?.photo,
      role: decoded?.userInfo?.role,
      status: decoded?.userInfo?.status,
      telephone: decoded?.userInfo?.telephone,
      user_id: decoded?.userInfo?.user_id,
      usernames: decoded?.userInfo?.usernames,
    });
  }, []);

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-side-menu">
        <div className="menu-header">
          <img src={process.env.PUBLIC_URL + "/dgrk.jpeg"} alt="logo-img" />
          <h3>Identification & Taxe</h3>
        </div>
        <div className="menu-options">
          <NavLink
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            to="/user"
            exact={true}
          >
            <MdOutlineDashboard className="link-icon" />
            <span>Tableau de Bord</span>
          </NavLink>
          <NavLink
            to="/user/paiement"
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
          >
            <MdAttachMoney className="link-icon" />
            <span>Paiements</span>
          </NavLink>
          <NavLink
            to="/user/qrcodes"
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
          >
            <MdQrCodeScanner className="link-icon" />
            <span>QrCodes</span>
          </NavLink>
          <NavLink
            to="/user/prop-bien"
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
          >
            <FaUserFriends className="link-icon" />
            <span>Propriétaires</span>
          </NavLink>
          <NavLink
            to="/user/agent"
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
          >
            <BiUser className="link-icon" />
            <span>Agent</span>
          </NavLink>
          <NavLink
            to="/user/settings"
            className="links"
            activeClassName="active-option"
            inactiveClassName="inactive-option"
          >
            <VscSettings className="link-icon" />
            <span>Parmètre</span>
          </NavLink>
        </div>
      </div>
      <hr />
      <div className="admin-side-content">
        <div className="side-content-header">
          <div className="sch-l">
            <div className="burger-menu">
              <div className="burger"></div>
            </div>
            <div className="sch-search">
              <input type="text" name="" id="" placeholder="Search" />
              <label htmlFor="">
                <BiSearch />
              </label>
            </div>
          </div>
          <div className="sch-r">
            <ul>
              <li>
                <div className="sch-r-item">
                  <MdOutlineNotificationsActive className="icons" />
                  <span>9+</span>
                </div>
              </li>
              <li>
                <div className="sch-r-item">
                  <FaRegEnvelope className="icons" />
                  <span>9+</span>
                </div>
              </li>
              <li>
                <div className="sch-r_avatar">
                  <div
                    className="sch-r-item"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    <img
                      src={"http://localhost:5500/imgs/" + user.photo}
                      alt="logo-img"
                    />
                  </div>
                  <div
                    className="sch-r-item-drawer"
                    style={{ display: isDrawerOpen ? "block" : "none" }}
                  >
                    <h4>{user?.usernames || "Username"}</h4>
                    <ul>
                      <li>
                        <Link to="" className="links">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="links" onClick={signOut}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="side-content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default User;

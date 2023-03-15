const User = require("../models/User");
const Login = require("../models/Login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
var dateTime = require("node-datetime");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/imgs/"));
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `p-${Date.now()}.${ext}`);
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("Only image is allowed..."));
    }
  },
}).single("photo");

module.exports = {
  upload: uploadImage,
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: username }, { telephone: username }],
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 0,
        islogged: false,
        message: "E-mail ou Numéro de téléphone renseigné est incorrect.",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        status: 0,
        islogged: false,
        message: "Le mot de passe est incorrect.",
      });
    }

    const user_id = user.id;
    const latitude = "0.0";
    const longitude = "0.0";
    const connection_status = 1;

    const refreshToken = jwt.sign(
      {
        userInfo: {
          user_id: user.id,
          usernames: user.names,
          gender: user.sexe,
          telephone: user.telephone,
          birth: user.birth,
          role: [user.role],
          email: user.email,
          status: user.status,
          photo: user.photo,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const login = await Login.create({
      user_id,
      latitude,
      longitude,
      connection_status,
      refresh_token: refreshToken,
    });

    const accessToken = jwt.sign(
      {
        userInfo: {
          user_id: user.id,
          usernames: user.names,
          gender: user.sexe,
          telephone: user.telephone,
          birth: user.birth,
          role: [user.role],
          email: user.email,
          status: user.status,
          photo: user.photo,
          login_id: login.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      islogged: true,
      message: "Connexion réussie!",
      accessToken,
    });
  },
  async refreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log({ "cookies verify ": cookies.jwt });
    const refreshToken = cookies.jwt;

    const connected = await Login.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!connected) {
      return res.status(400).json({
        status: 0,
        islogged: false,
        message: "Cette connexion n'existe pas. Le jeton non reconnu.",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || connected.user_id !== decoded.userInfo.user_id)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            userInfo: {
              user_id: decoded.userInfo.user_id,
              usernames: decoded.userInfo.usernames,
              gender: decoded.userInfo.gender,
              telephone: decoded.userInfo.telephone,
              birth: decoded.userInfo.birth,
              role: decoded.userInfo.role,
              email: decoded.userInfo.email,
              status: decoded.userInfo.status,
              photo: decoded.userInfo.photo,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );
        const roles = decoded.userInfo.role;
        res.json({ roles, accessToken });
      }
    );
  },
  async logout(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    console.log({ "token renvoyé ": refreshToken });

    //It refreshToken in db ?
    const connected = await Login.findOne({
      where: { refresh_token: refreshToken },
    });
    console.log({ "resultat token trouvé ": connected });

    if (!connected) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }

    //Delete or desactivate refreshToken in db
    var dt = dateTime.create();
    var formatted = dt.format("Y-m-d H:M:S");
    const update_at = formatted;

    const connection_status = 0;

    const dislog = await Login.update(
      { connection_status, update_at },
      { where: { refresh_token: refreshToken } }
    );

    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    return res.status(200).json({
      status: 1,
      message: "Deconnexion réussie!",
      islogged: false,
      dislog,
    });
  },
  async get(req, res) {
    try {
      const users = await User.findAll();

      if (users == "" || users == null) {
        return res
          .status(200)
          .json({ message: "Aucune information disponible." });
      }
      return res.status(200).json({ users });
    } catch (error) {
      console.log({ "Error of get users : ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;
      const _key = key.toUpperCase();
      //
      // const keys =
      //   key.split(" ")[0].charAt(0).toUpperCase() +
      //   key.split(" ")[0].slice(1).toLowerCase() +
      //   " " +
      //   key.split(" ")[1]?.charAt(0).toUpperCase() +
      //   key.split(" ")[1]?.slice(1).toLowerCase();
      //
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { names: { [Op.like]: `%${_key}%` } },
            { email: { [Op.like]: `%${_key}%` } },
            { telephone: { [Op.like]: `%${_key}%` } },
          ],
        },
      });

      if (users == "" || users == null) {
        return res
          .status(200)
          .json({ message: "Aucune information disponible." });
      }
      return res.status(200).json({ users });
    } catch (error) {
      console.log({ "Error of get users : ": error });
    }
  },
  async create(req, res) {
    const password = "1234";
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //const PASSWORD_REGEX = /^(?=.*\d).{4,8}/

    try {
      const { name, prename, sexe, telephone, birth, role, email } = req.body;
      // const names =
      //   prename.charAt(0).toUpperCase() +
      //   prename.slice(1).toLowerCase() +
      //   " " +
      //   name.charAt(0).toUpperCase() +
      //   name.slice(1).toLowerCase();
      const names = prename.toUpperCase() + " " + name.toUpperCase();
      const thumbnails = req?.file?.filename || "user.png";

      const cm = email || null;

      if (cm !== null) {
        if (!EMAIL_REGEX.test(String(email).toLowerCase())) {
          return res
            .status(400)
            .json({ status: 0, message: "L'e-mail fourni est invalid" });
        }
      }

      const check_mail = await User.findOne({ where: { email: email } });

      if (cm !== null) {
        if (check_mail != null) {
          return res
            .status(400)
            .json({ status: 0, message: "L'e-mail fourni est déjà utilisé" });
        }
      }

      const check_telephone = await User.findOne({
        where: { telephone: telephone },
      });

      if (check_telephone != null) {
        return res.status(400).json({
          status: 0,
          message: "Le numéro de téléphone fourni est déjà utilisé",
        });
      }

      const user = await User.create({
        names,
        sexe,
        telephone,
        birth,
        role,
        email,
        password,
        photo: thumbnails,
      });

      return res.status(200).json({
        status: 1,
        message: `${names} est enregistrée avec succès.`,
        user,
      });
    } catch (error) {
      console.log({ "Error of create of user : ": error });
    }
  },
  async update(req, res) {
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    try {
      const { names, sexe, telephone, birth, role, email } = req.body;
      const { user_id } = req.params;

      if (!EMAIL_REGEX.test(String(email).toLowerCase())) {
        return res.status(400).json({ message: "L'e-mail fourni est invalid" });
      }

      const check_mail = await User.findOne({ where: { email: email } });

      if (check_mail != null) {
        return res
          .status(400)
          .json({ message: "L'e-mail fourni est déjà utilisé" });
      }

      const check_telephone = await User.findOne({
        where: { telephone: telephone },
      });

      if (check_telephone != null) {
        return res
          .status(400)
          .json({ message: "Le numéro de téléphone fourni est déjà utilisé" });
      }

      const user = await User.update(
        { names, sexe, telephone, birth, role, email },
        { where: { id: user_id } }
      );
      return res
        .status(200)
        .json({ status: 1, message: "user updated succefully", user });
    } catch (error) {
      console.log({ "Error of update : ": error });
    }
  },
  async delete(req, res) {
    try {
      const { user_id } = req.params;
      await User.destroy({ where: { id: user_id } });

      return res.status(200).json({
        status: 1,
        message: "user deleted successfully",
      });
    } catch (error) {
      console.log({ "Error of delete : ": error });
    }
  },
};

const sequelize = require("sequelize");
const dbConfig = require("../config/database-config");

const User = require("../models/User");
const Login = require("../models/Login");
const Propertytype = require("../models/Propertytype");
const Qrcode = require("../models/Qrcode");
const Taxe = require("../models/Taxe");
const Relatif = require("../models/Relatif");
const Property = require("../models/Property");
const Documents = require("../models/Documents");
const Payment = require("../models/Payment");
const Controls = require("../models/Controls");

const connection = new sequelize(dbConfig);

User.init(connection);
Login.init(connection);
Property.init(connection);
Propertytype.init(connection);
Qrcode.init(connection);
Taxe.init(connection);
Relatif.init(connection);
Documents.init(connection);
Payment.init(connection);
Controls.init(connection);

User.associate(connection.models);
Login.associate(connection.models);
Property.associate(connection.models);
Propertytype.associate(connection.models);
Qrcode.associate(connection.models);
Taxe.associate(connection.models);
Relatif.associate(connection.models);
Documents.associate(connection.models);
Payment.associate(connection.models);
Controls.associate(connection.models);

// try {
//   connection.authenticate();
//   console.log("Connection has been established successfully.")
// } catch (error) {
//   console.error("unable to connect to the database : ", error);
// }

module.exports = connection;

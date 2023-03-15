const { request, response } = require("express");
const express = require("express");
const UserController = require("./controllers/UserController");
const PropertyTypeController = require("./controllers/PropertyTypeController");
const PropertyController = require("./controllers/PropertyController");
const DocumentsController = require("./controllers/DocumentsController");
const ControlsController = require("./controllers/ControlsController");
const PaymentController = require("./controllers/PaymentController");
const TaxeController = require("./controllers/TaxeController");
const QrcodeController = require("./controllers/QrcodeController");
const RelatifController = require("./controllers/RelatifController");

const verifyJWT = require("./middleware/verifyJWT");

const router = express.Router();

//user
router
  .post("/users", UserController.upload, UserController.create)
  .get("/users", UserController.get);
router.get("/users/key/:key", UserController.getByKey);
router.get("/refresh", UserController.refreshToken);
router.post("/users/login", UserController.login);
router.get("/users/logout", verifyJWT, UserController.logout);
router.put("/users/:user_id", verifyJWT, UserController.update);
router.delete("/users/:user_id", verifyJWT, UserController.delete);
//
//Property type
router.get("/property/types", PropertyTypeController.get);
router.post("/property/types", PropertyTypeController.create);
router.put("/property/types/:user_id", PropertyTypeController.update);
router.delete("/property/types/:user_id", PropertyTypeController.delete);
//
//Property
router.get("/propertys", verifyJWT, PropertyController.get);
router.get("/propertys/key/:key", verifyJWT, PropertyController.getByKey);
router.post("/propertys", PropertyController.create);
router.put("/propertys/:user_id", PropertyController.update);
router.delete("/propertys/:user_id", PropertyController.delete);
//
//qrcodes
router.get("/qrcodes", verifyJWT, QrcodeController.get);
router.post("/qrcodes", verifyJWT, QrcodeController.create);
router.get("/qrcodes/key/:key", QrcodeController.getByKey);
router.get("/qrcodes/print", verifyJWT, QrcodeController.getPrint);
//router.get("/qrcodes/print", verifyJWT, QrcodeController.getPrint);
//
//taxe
router.get("/taxes", TaxeController.get);
router.post("/taxes", TaxeController.create);
router.put("/taxes/:taxe_id", TaxeController.update);
router.delete("/taxes/:taxe_id", TaxeController.delete);
//
//taxe relatif
router.get("/taxes/relatif", RelatifController.get);
router.post("/taxes/relatif", RelatifController.create);
router.delete("/taxes/relatif/:taxe_rel_id", RelatifController.delete);
//
//documents
router.get("/documents", DocumentsController.get);
router.post("/documents", DocumentsController.create);
router.put("/documents/:document_id", DocumentsController.update);
router.delete("/documents/:document_id", DocumentsController.delete);
//
//controls
router.get("/controls", ControlsController.get);
router.post("/controls", ControlsController.create);
router.delete("/controls/:control_id", ControlsController.delete);
//
//payments
router.get("/payments", PaymentController.get);
router.post("/payments", PaymentController.create);
router.delete("/payments/:payment_id", PaymentController.delete);

module.exports = router;

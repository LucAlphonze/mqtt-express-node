/* 
  Ruta: /api/variables
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  obtenerVariables,
  crearVariable,
} = require("../controllers/variable.controller");

const router = Router();

router.get("/", obtenerVariables);

router.post("/", crearVariable);

module.exports = router;

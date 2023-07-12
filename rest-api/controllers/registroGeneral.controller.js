const mongoose = require("mongoose");
const RegistroGeneral = require("../models/registroGeneral.model");

const obtenerTodos = async (req, res) => {
  try {
    const registrosGenerales = await RegistroGeneral.find()
      .limit(20)
      .sort({ fecha_lectura: -1 })
      .populate("id_variable", "nombre");
    res.status(200).json({
      ok: true,
      datos: registrosGenerales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const obtenerRegistrosGenerales = async (req, res) => {
  try {
    var medidas = req.params.idVariable;
    const registrosGenerales = await RegistroGeneral.findOne({
      id_variable: medidas,
    })
      .sort({ fecha_lectura: -1 })
      .populate("id_variable", "nombre");
    res.status(200).json({
      ok: true,
      datos: registrosGenerales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

// const filtrarRegistrosGenerales = async (req, res) => {
//   try {
//     var medidas = req.params.idVariable
//     var sti = req.params.startdate;
//     var stf = req.params.enddate;
//     const registrosFiltrados = await RegistroGeneral.aggregate(
//       [
//         {
//           '$match': {
//             'id_variable': new mongoose.Types.ObjectId(medidas)
//           }
//         }, {
//           '$match': {
//             'fecha_lectura': {
//               '$gte': new Date(parseInt(sti)),
//               '$lte': new Date(parseInt(stf))
//             }
//           }
//         }, {
//           '$group': {
//             '_id': {
//               'month': {
//                 '$month': {
//                   'date': '$fecha_lectura',
//                   'timezone': '-03:00'
//                 }
//               },
//               'day': {
//                 '$dayOfMonth': {
//                   'date': '$fecha_lectura',
//                   'timezone': '-03:00'
//                 }
//               },
//               'hour': {
//                 '$hour': {
//                   'date': '$fecha_lectura',
//                   'timezone': '-03:00'
//                 }
//               },
//               "interval": {
//                 "$subtract": [
//                   { "$minute": "$fecha_lectura" },
//                   { "$mod": [{ "$minute": "$fecha_lectura" }, 15] }
//                 ]
//               }
//             },
//             'potencia': {
//               '$avg': '$valor_lectura'
//             }
//           }
//         }, {
//           '$sort': {
//             '_id': 1
//           }
//         }
//       ]
//     )
//     res.status(200).send(registrosFiltrados);

//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       error
//     });
//   }
// };

const crearRegistroGeneral = async (req, res) => {
  const registroGeneral = new RegistroGeneral(req.body);

  try {
    await registroGeneral.save();

    res.status(200).json({
      ok: true,
      datos: registroGeneral,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = {
  obtenerTodos,
  obtenerRegistrosGenerales,
  crearRegistroGeneral,
};

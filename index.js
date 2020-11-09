const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* CONEXIÓN CON LA BASE DE DATOS */
let db;
MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("menus");
  }
});

/* TODAS LOS MENUS DE LA COLECCION*/
app.get("/api/menus", function (req, res) {
  db.collection("menus")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});


/* AÑADIR UN MENU A LA COLECCIÓN */
app.post("/api/nuevoMenu", function (req, res) {
  let menu = {
    numero: req.body.numero,
    primero: req.body.primero,
    segundo: req.body.segundo,
    postre: req.body.postre,
    precio: req.body.precio,
    };

  db.collection("menus")
    .insertOne( menu, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      db.collection("menus")
        .find()
        .toArray(function (err, data) {
          if (err !== null) {
            res.send(err);
          } else {
            res.send(data);
          }
        });
    }
  });
});


/* MODIFICAR UN MENU DE LA COLECCION */
app.put("/api/editarMenu", function (req, res) {
    
let menu = {
    numero: req.body.numero,
    primero: req.body.primero,
    segundo: req.body.segundo,
    postre: req.body.postre,
    precio: req.body.precio,
    }

  db.collection("menus")
     .updateOne( menu, function (err, datos) {
          if (err !== null) {
            res.send(err);
            } else {
                console.log(datos);
                res.send(datos);
            }
        });
});


/* ELIMINAR UN MENU DE LA COLECCION */
app.delete("/api/borrarMenu", function (req, res) {
  const numero = req.body.numero
  
  db.collection("menus")
    .deleteMany(
      { numero: numero }, function (err, datos) {
          if (err !== null) {
            res.send(err);
          } else {
            res.send(datos);
          }
    });
});
    


app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          

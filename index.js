const express = require("express");
const { connecter } = require("./config/connect");
const routeUtilisateur = require('./routes/utilisateur');
const app = express();

app.use(express.urlencoded({extended: true }));
app.use(express.json());

app.use('/api/v1', routeUtilisateur);

connecter("mongodb://127.0.0.1:27017/", (erreur) => {
  if (erreur) {
    console.log("Erreur de connexion a la base de donnée mongodb");
    process.exit(-1);
  } else {
    console.log("Connection avec la base de donnée établier");
    app.listen(3000);
    console.log("J'ecoute au port 3000");
  }
});

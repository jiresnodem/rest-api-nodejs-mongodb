const { Utilisateur } = require("../models/utilisateur");

const client = require("../config/connect");
const { ObjectID } = require("bson");

const ajouterUtilisateur = async (req, res) => {
  try {
    let utilisateur = new Utilisateur(
      req.body.noms,
      req.body.address,
      req.body.tel
    );

    let result = await client
      .db()
      .collection("utilisateurs")
      .insertOne(utilisateur);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getTousUtilisateurs = async (req, res) => {
  try {
    let cursor = client.db().collection("utilisateurs").find();
    let result = await cursor.toArray();

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "aucun utilisateur trouvé" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUtilisateur = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let cursor = client.db().collection("utilisateurs").find({ _id: id });
    let result = await cursor.toArray();

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(204).json({ message: "cet utilisateur n'existe pas" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const modififierUtilisateur = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);
    let nNoms = req.body.noms;
    let nAddress = req.body.address;
    let nTel = req.body.tel;

    let result = await client
      .db()
      .collection("utilisateurs")
      .updateOne(
        { _id: id },
        { $set: { noms: nNoms, address: nAddress, tel: nTel } }
      );

      if (result.modifiedCount == 1) {
        res.status(200).json({message: "L'utilisateur été modifier avec succés"});
      } else {
        res.status(204).json({ message: "Cet utlisteur n'existe pas" });
      }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const supprimerUtilisateur = async (req, res) => {
  try {
    let id = new ObjectID(req.params.id);

    let result = await client
      .db()
      .collection("utilisateurs")
      .deleteOne({ _id: id });

      if (result.deletedCount == 1) {
        res.status(200).json({message: "L'utilisateur été supprimé avec succés"});
      } else {
        res.status(404).json({ message: "Cet utlisteur n'existe pas" });
      }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  ajouterUtilisateur,
  getTousUtilisateurs,
  getUtilisateur,
  modififierUtilisateur,
  supprimerUtilisateur
};

const express = require('express');
const { ajouterUtilisateur, getTousUtilisateurs, getUtilisateur, modififierUtilisateur, supprimerUtilisateur } = require('../controllers/utilisateur');
const router = express.Router();

router.route('/utilisateur').post(ajouterUtilisateur);
router.route('/utilisateur').get(getTousUtilisateurs);
router.route('/utilisateur/:id').get(getUtilisateur);
router.route('/utilisateur/:id').put(modififierUtilisateur);
router.route('/utilisateur/:id').delete(supprimerUtilisateur);


module.exports = router;
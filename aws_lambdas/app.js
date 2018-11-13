const express = require('express');
const router = express.Router();
const cognitoValidator = require('./validate-admin');
router.use(cognitoValidator);

router.get('/', function (req, res) {
    res.json({'message': 'Usuario Autenticado'});
});

module.exports = router;

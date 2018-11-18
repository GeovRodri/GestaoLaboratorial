const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const cognitoValidator = require('../validate-admin');
const uuidv4 = require('uuid/v4');

const documentClient = new AWS.DynamoDB.DocumentClient();
AWS.config.loadFromPath('./config.json');

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());
router.use(cognitoValidator);

router.post('/', function (req, res) {
    const params = {
        Item : {
            "$key": uuidv4(),
            "laboratoryId": req.body.laboratoryId,
            "initialDay": req.body.initialDay,
            "startTime": req.body.startTime
        },
        TableName : 'reserves'
    };
    documentClient.put(params, function(err, data){
        res.json({'message': 'Reserva feita com sucesso!'});
    });
});

module.exports = router;

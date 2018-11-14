'use strict';
const express = require('express');
const router = express.Router();
const app = express();
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');

const cognitoValidator = require('./validate-admin');
router.use(cognitoValidator);
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

const AWS = require('aws-sdk');
const uuid = require('uuid');
const documentClient = new AWS.DynamoDB.DocumentClient();

const port = process.env.PORT || 8080;

router.get('/', function (req, res) {
    res.json({'message': 'Usuario Autenticado'});
});

router.post('/category', function (req, res) {
    const params = {
        Item : {
            "id" : uuid.v1(),
            "Name" : 'Minha categoria'
        },
        TableName : 'categories'
    };
    documentClient.put(params, function(err, data){
        res.json({'message': 'Categoria salva com sucesso!'});
    });
});

router.get('/category', function (req, res) {
    const params = {
        TableName : 'categories'
    };
    documentClient.scan(params, function(err, data){
        res.json(data.Items);
    });
});

app.use('/', router);
app.listen(port);
module.exports = app;

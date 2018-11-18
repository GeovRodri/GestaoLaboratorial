const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const cognitoValidator = require('../validate-admin');

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
            "$key": req.body.$key
        },
        TableName : 'categories'
    };
    documentClient.put(params, function(err, data){
        res.json({'message': 'Categoria salva com sucesso!'});
    });
});

router.get('/', function (req, res) {
    const params = {
        TableName : 'categories'
    };
    documentClient.scan(params, function(err, data){
        if (err) {
            console.log(err);
        }

        res.json(data.Items);
    });
});

router.get('/:id', function (req, res) {
    const id = req.params.id;
    const params = {
        TableName : 'categories',
        Key: {
            "$key": id
        }
    };

    documentClient.get(params, function(err, data){
        if (err) {
            console.log(err);
        }

        res.json(data.Item);
    });
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    const params = {
        TableName : 'categories',
        Key: {
            "$key": id
        }
    };

    documentClient.delete(params, function(err, data){
        if (err) {
            console.log(err);
        }

        res.json({'message': 'Categoria removida com sucesso!'});
    });
});

module.exports = router;

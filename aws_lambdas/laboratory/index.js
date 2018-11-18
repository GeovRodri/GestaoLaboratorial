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
            "categories": req.body.categories,
            "haveComputer": req.body.haveComputer,
            "haveDatashow": req.body.haveDatashow,
            "name": req.body.name,
            "operatingHours": req.body.operatingHours
        },
        TableName : 'laboratories'
    };
    documentClient.put(params, function(err, data){
        res.json({'message': 'Laboratório salvo com sucesso!'});
    });
});

router.get('/', function (req, res) {
    const params = {
        TableName : 'laboratories'
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
        TableName : 'laboratories',
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
        TableName : 'laboratories',
        Key: {
            "$key": id
        }
    };

    documentClient.delete(params, function(err, data){
        if (err) {
            console.log(err);
        }

        res.json({'message': 'Laboratório removido com sucesso!'});
    });
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    const params = {
        TableName : 'laboratories',
        Key: {
            "$key": id
        },
        UpdateExpression: "set #b=:b, #c=:c, #d=:d, #e=:e, #f=:f",
        ExpressionAttributeValues:{
            ":b": req.body.categories,
            ":c": req.body.haveComputer,
            ":d": req.body.haveDatashow,
            ":e": req.body.name,
            ":f": req.body.operatingHours
        },
        ExpressionAttributeNames: {
            "#b": "categories",
            "#c": "haveComputer",
            "#d": "haveDatashow",
            "#e": "name",
            "#f": "operatingHours"
        }
    };

    documentClient.update(params, function(err, data){
        if (err) {
            console.log(err);
        }

        res.json({'message': 'Laboratório alterado com sucesso!'});
    });
});

module.exports = router;

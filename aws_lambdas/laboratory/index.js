const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const cognitoValidator = require('../validate-admin');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

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

router.get('/search-hours/:timestamp', function (req, res) {
    const dayTimestamp = Number(req.params.timestamp);
    const laboratoriesParams = {
        TableName : 'laboratories'
    };
    documentClient.scan(laboratoriesParams, function(err, data){
        if (err) {
            console.log(err);
        }

        const searchHoursLaboratory = (dayTimestamp, laboratory) => {
            return new Promise((resolve, reject) => {
                const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                const dayOfWeek = daysOfWeek[moment(dayTimestamp).utc(true).weekday()];

                const reservesParams = {
                    TableName : 'reserves',
                    Key: {
                        "laboratoryId": laboratory.$key,
                        "initialDay": dayTimestamp
                    },
                };
                documentClient.scan(reservesParams, function(err, data){
                    if (err) {
                        console.log(err);
                    }

                    const reservesHours = [];
                    const hours = [];
                    const reserves = data.Items;
                    if (reserves) {
                        // pegar dia da semana
                        reserves.forEach((reserve) => {
                            reservesHours.push(reserve.startTime);
                        });
                    }
                    // pegando horario do dia e verificar se ele já não está reservado
                    console.log('Laboratorio: ', laboratory);
                    console.log('Dia da semana: ', dayOfWeek);
                    console.log('Horas reservadas: ', reservesHours);
                    const operatingHours = laboratory.operatingHours[dayOfWeek];
                    if (operatingHours) {
                        const operatingHoursKeys = Object.keys(operatingHours);
                        operatingHoursKeys.forEach((operatingKey) => {
                            const operatingHour = operatingHours[operatingKey];
                            if (reservesHours.indexOf(operatingHour.startTime) === -1) {
                                operatingHour['laboratoryId'] = laboratory.$key;
                                operatingHour['name'] = laboratory.name;
                                console.log('Horas: ', operatingHour);
                                hours.push(operatingHour);
                            }
                        });
                    }
                    resolve(hours);
                });
            });
        };

        const promises = [];
        const laboratories = data.Items;
        laboratories.forEach((laboratory) => {
            promises.push(searchHoursLaboratory(dayTimestamp, laboratory));
        });

        Promise.all(promises).then((results) => {
            let list = [];
            console.log('Resultados: ', results);
            results.forEach((result) => {
                list = list.concat(result);
            });

            res.setHeader('content-type', 'application/json');
            res.status(200).send(list);
        }).catch((error) => {
            console.log(error);
            res.setHeader('content-type', 'application/json');
            res.status(500).send({ 'message': 'Error in get laboratories.' });
        });
    });
});

module.exports = router;

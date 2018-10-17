const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const moment = require('moment');
admin.initializeApp(functions.config().firebase);

exports.searchHours = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const dayTimestamp = req.body.timestamp;

        admin.database().ref('laboratories').once('value').then((laboratoriesSnap) => {
            let promises = [];
            const laboratories = laboratoriesSnap.val();
            const laboratoriesKeys = Object.keys(laboratories);

            laboratoriesKeys.forEach((laboratoryKey) => {
                const laboratory = laboratories[laboratoryKey];
                promises.push(searchHoursLaboratory(dayTimestamp, laboratoryKey, laboratory));
            });

            Promise.all(promises).then((results) => {
                res.setHeader('content-type', 'application/json');
                res.status(200).send(results);
            });
        });
    });
});

function searchHoursLaboratory(dayTimestamp, laboratoryId, laboratory) {
    return new Promise((resolve, reject) => {
        const reservesPath = 'reserves/' + laboratoryId + '/' + dayTimestamp;
        admin.database().ref(reservesPath).once('value').then((reservesSnap) => {
            const reserves = reservesSnap.val();
            const reservesKeys = Object.keys(reserves);
            // pegar dia da semana
            const dayOfWeek = moment(dayTimestamp).daysOfWeek
            let reservesHours = [];

            reservesKeys.forEach((reserveKey) => {
                const reserve = reserves[reserveKey];
                reservesHours.push(reserve.startTime);
            });

            // pegar horario do dia e verificar se ele já não está reservado

            let result = {
                'laboratoryId': laboratoryId,
                'name': laboratory.name,
                'hours': []
            };

            resolve(result);
        });
    });
}

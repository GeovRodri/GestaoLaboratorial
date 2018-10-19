const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const moment = require('moment');
admin.initializeApp(functions.config().firebase);
exports.searchHours = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const dayTimestamp = req.body.timestamp;
        admin.database().ref('laboratories').once('value').then((laboratoriesSnap) => {
            const promises = [];
            const laboratories = laboratoriesSnap.val();
            const laboratoriesKeys = Object.keys(laboratories);
            laboratoriesKeys.forEach((laboratoryKey) => {
                const laboratory = laboratories[laboratoryKey];
                promises.push(searchHoursLaboratory(dayTimestamp, laboratoryKey, laboratory));
            });
            Promise.all(promises).then((results) => {
                res.setHeader('content-type', 'application/json');
                res.status(200).send(results);
            }).catch((error) => {
                res.setHeader('content-type', 'application/json');
                res.status(500).send({ 'message': 'Error in get laboratories.' });
            });
        });
    });
});
function searchHoursLaboratory(dayTimestamp, laboratoryId, laboratory) {
    return new Promise((resolve, reject) => {
        const reservesPath = 'reserves/' + laboratoryId + '/' + dayTimestamp;
        admin.database().ref(reservesPath).once('value').then((reservesSnap) => {
            const reservesHours = [];
            const hours = [];
            const reserves = reservesSnap.val();
            const reservesKeys = Object.keys(reserves);
            // pegar dia da semana
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[moment(dayTimestamp).getDaysOfWeek()];
            reservesKeys.forEach((reserveKey) => {
                const reserve = reserves[reserveKey];
                reservesHours.push(reserve.startTime);
            });
            // pegando horario do dia e verificar se ele já não está reservado
            const operatingHours = laboratory.operatingHours[dayOfWeek];
            const operatingHoursKeys = Object.keys(operatingHours);
            operatingHoursKeys.forEach((operatingKey) => {
                const operatingHour = operatingHours[operatingKey];
                if (reservesHours.indexOf(operatingHour.startTime) === -1) {
                    hours.push(operatingHour);
                }
            });
            const result = {
                'laboratoryId': laboratoryId,
                'name': laboratory.name,
                'hours': hours
            };
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}
//# sourceMappingURL=index.js.map
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
});
function searchHoursLaboratory(dayTimestamp, laboratoryId, laboratory) {
    return new Promise((resolve, reject) => {
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayOfWeek = daysOfWeek[moment(dayTimestamp).weekday()];
        const reservesPath = 'reserves/' + laboratoryId + '/' + dayTimestamp;
        admin.database().ref(reservesPath).once('value').then((reservesSnap) => {
            const reservesHours = [];
            const hours = [];
            const reserves = reservesSnap.val();
            if (reserves) {
                const reservesKeys = Object.keys(reserves);
                // pegar dia da semana
                reservesKeys.forEach((reserveKey) => {
                    const reserve = reserves[reserveKey];
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
                        operatingHour['laboratoryId'] = laboratoryId;
                        operatingHour['name'] = laboratory.name;
                        console.log('Horas: ', operatingHour);
                        hours.push(operatingHour);
                    }
                });
            }
            resolve(hours);
        }).catch((error) => {
            reject(error);
        });
    });
}
//# sourceMappingURL=index.js.map
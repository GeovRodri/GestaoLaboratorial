const CognitoExpress = require("cognito-express");

const cognitoExpress = new CognitoExpress({
    region: 'us-east-1',
    cognitoUserPoolId: 'us-east-1_XAIqwUUbI',
    tokenUse: "id",
    tokenExpiration: 3600000
});

function validateAdmin(req, res, next) {
    let accessTokenFromClient = req.headers.authorization;

    if (!accessTokenFromClient) return res.status(401).send("Access Token missing from header");

    cognitoExpress.validate(accessTokenFromClient, function (err, response) {
        if (err) return res.status(401).send(err);
        res.locals.user = response;
        next();
    });
}

module.exports = validateAdmin;

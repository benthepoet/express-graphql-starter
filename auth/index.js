const jsonwebtoken = require('jsonwebtoken');
const level = require('level');
const { Router } = require('express');

const GRANT = {
    PASSWORD: 'password',
    REFRESH: 'refresh'
};

const database = level('./tokendb');

const router = Router();

router.post('/auth/token', ({ body }, res) => {
    switch (body.grantType) {
        case GRANT.PASSWORD:
            createRefreshToken()
                .then(refreshToken => {
                    res.send({
                        accessToken: createAccessToken(),
                        refreshToken
                    });
                }); 
            break;
        case GRANT.REFRESH:
            validateRefreshToken(body.refreshToken)
                .then(() => {
                    res.send({
                        accessToken: createAccessToken()
                    });
                });
            break;
        default:
            res.sendStatus(400);
            break;
    }
});

module.exports = router;

function createAccessToken() {
    return jsonwebtoken.sign({}, 'a');
}

function createRefreshToken() {
    const payload = {};
    const refreshToken = jsonwebtoken.sign(payload, 'r');
    return database
        .put(refreshToken, payload)
        .then(() => refreshToken);
}

function validateRefreshToken(refreshToken) {
    return database
        .get(refreshToken);
}


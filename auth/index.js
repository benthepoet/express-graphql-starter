const jsonwebtoken = require('jsonwebtoken');
const level = require('level');
const randToken = require('rand-token');
const { Router } = require('express');

const database = level('./tokendb');

const router = Router();

router.post('/auth/sign-in', ({ body }, res) => {
    const accessToken = createAccessToken();

    createRefreshToken()
        .then(refreshToken => {
            const payload = {
                accessToken,
                refreshToken
            };

            res.send(payload);
        });
});

router.post('/auth/refresh', ({ body }, res) => {
    const accessToken = createAccessToken();

    getRefreshToken()
        .then(refreshToken => {
            res.send({ accessToken });
        });
});

module.exports = router;

function createAccessToken() {
    return jsonwebtoken.sign({}, 'a');
}

function createRefreshToken() {
    const payload = {};
    const refreshToken = randToken.generate(256);
    return database
        .put(refreshToken, payload)
        .then(() => refreshToken);
}

function getRefreshToken(refreshToken) {
    return database
        .get(refreshToken);
}


'use strict';

const express = require('express');
const rp = require('request-promise');

const getUserKey = ({user:{provider}, id}) => `${provider}-${id}`;

module.exports = es => {
    const url = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`;
    const router = express.Router();

    router.use((req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(403).json({
                error: 'You must sign in to use this service.'
            });
            return;
        }
        next();
    });

    return router;
}

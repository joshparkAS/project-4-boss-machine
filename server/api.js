const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minions');
const ideaRouter = require('./ideas');

apirouter.use('/ideas', ideaRouter);
apiRouter.use('/minions', minionRouter);

module.exports = apiRouter;

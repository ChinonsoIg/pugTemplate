const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:logoutRoutes');
const passport = require('passport');

const logoutRouter = express.Router();

function outRouter(nav) {
  logoutRouter.route('/')
    .get((req, res) => {
      debug('Logging out');
      req.logout();
      res.redirect('/');
    });

  return logoutRouter;
}

module.exports = outRouter;
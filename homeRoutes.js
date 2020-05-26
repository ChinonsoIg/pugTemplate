const express = require('express');
const homeController = require('../controllers/homeController');

const homeRouter = express.Router();
// const bankService = require('./services/goodreadsService');

function router(nav) {
  const { getIndex, getById, middleware } = homeController(nav);

  homeRouter.use(middleware);

  homeRouter.route('/')
    .get(getIndex);

  // homeRouter.route('/')
  //   .get(getByBankName);

  homeRouter.route('/:id')
    .get(getById);

  return homeRouter;
}

module.exports = router;

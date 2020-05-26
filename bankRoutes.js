const express = require('express');
const bankController = require('../controllers/bankController');

const bankRouter = express.Router();
// const bankService = require('./services/goodreadsService');

function router(nav) {
  const { getByBankName, getById, middleware } = bankController(nav);

  bankRouter.use(middleware);

  // bankRouter.route('/')
  //   .get(getIndex);

  bankRouter.route('/')
    .get(getByBankName);

  bankRouter.route('/:id')
    .get(getById);

  return bankRouter;
}

module.exports = router;

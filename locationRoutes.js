const express = require('express');
const locationController = require('../controllers/locationController');

const locationRouter = express.Router();
// const locationService = require('./services/goodreadsService');

function router(nav) {
  const { getByLocationName, getById, middleware } = locationController(nav);

  locationRouter.use(middleware);

  // locationRouter.route('/')
  //   .get(getIndex);

  locationRouter.route('/')
    .get(getByLocationName);

  locationRouter.route('/:id')
    .get(getById);

  return locationRouter;
}

module.exports = router;

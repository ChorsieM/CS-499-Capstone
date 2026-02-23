// ENHANCEMENT NOTES:
// Updated routes to use service functions (homeService / roomsService). Added a /rooms route to demonstrate filter/sort/search logic and kept error handling consistent with try/catch + next(err).
//
var express = require('express');
var router = express.Router();

// Category One (Design): pull "page data" out of the route
const homeService = require('../services/homeService');

// Category Two (Algorithms): filtering/sorting/searching logic in a service
// Category Three tie-in: service can pull from MongoDB if connected
const roomsService = require('../services/roomsService');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const viewModel = homeService.getHomeViewModel();
    res.render('index', viewModel);
  } catch (err) {
    next(err);
  }
});

/* GET rooms page (dynamic list + filters). */
router.get('/rooms', async function(req, res, next) {
  try {
    const viewModel = await roomsService.getRoomsViewModel(req.query);
    res.render('rooms', viewModel);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

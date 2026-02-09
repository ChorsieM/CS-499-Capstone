var express = require('express');
var router = express.Router();

// ENHANCEMENT: Import service layer for home page data
// ENHANCEMENT (Category Two): rooms service handles filter/sort/search logic
const roomsService = require('../services/roomsDbService');
const homeService = require('../services/homeService');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    // ENHANCEMENT: Route now calls service instead of building data inline
    const viewModel = homeService.getHomeViewModel();
    res.render('index', viewModel);
  } catch (err) {
    next(err);
  }
});

// ENHANCEMENT (Category Two): /rooms page demonstrates algorithmic logic
router.get('/rooms', function(req, res, next) {
  try {
    const viewModel = roomsService.getRoomsViewModel(req.query);
    res.render('rooms', viewModel);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

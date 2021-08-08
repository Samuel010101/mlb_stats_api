var express = require('express');

var MlbPlayerController = require('../controllers/mlb_player');

var router = express.Router();


router.post('/test', MlbPlayerController.test);
router.post('/save-mlbPlayer', MlbPlayerController.saveStatPlayer);
router.get('/stat/:search', MlbPlayerController.getMlbPlayer);



module.exports = router;
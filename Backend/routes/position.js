var express = require('express');
var router = express.Router();

const { addPosition, listPositions, removePosition, updatePosition, searchPosition } = require('../controllers/positions');
const { auth } = require('../middlewares/auth');

router.post('/add', auth, addPosition);
router.post('/update', auth, updatePosition)
router.delete('/remove', auth, removePosition);
router.get('/list', auth, listPositions);
router.get('/search', searchPosition);

module.exports = router;
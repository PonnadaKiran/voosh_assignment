const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.createEvent);
router.get('/view', eventController.viewEvents);
router.delete('/delete/:id', eventController.deleteEvent);

module.exports = router;

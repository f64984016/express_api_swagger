var express = require('express');
var router = express.Router();
const pageController = require('../controllers/pagesController');

// Get all pages
router.get('/', pageController.getAllPages);

// Create page
router.post('/', pageController.createPage);

module.exports = router;
var express = require('express');
var router = express.Router();
const pageController = require('../controllers/pagesController');

// Get all pages
router.get('/', pageController.getAllPages);

// Get one page
router.get('/:id', pageController.getPagesById);

// Create page
router.post('/', pageController.createPage);

// Update page
router.put('/:id', pageController.putPage);

// Delete page
router.delete('/:id', pageController.deletePage);

module.exports = router;
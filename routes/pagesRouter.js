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
router.put('/:id', (req, res) => { res.status(500).send('NotImplement Exception')});

// Delete page
router.delete('/:id', (req, res) => { res.status(500).send('NotImplement Exception')});

module.exports = router;
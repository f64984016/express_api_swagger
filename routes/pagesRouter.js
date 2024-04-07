var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
var pageModel = require('../models/pagesModel');

//pages
const pages = [
    {id: uuidv4(), 'name':'Home','url':'/'},
    {id: uuidv4(), 'name':'MUI','url':'/mui'},
    {id: uuidv4(), 'name':'Three','url':'/box_three'},
    {id: uuidv4(), 'name':'Example','url':'/example'}
];

// Get all pages
router.get('/', (req, res) => {
    const pages = pageModel.getAll();
    res.send(pages);
});

// Create page
router.post('/', (req, res) => {
    // Validation
    
    
    const newPage = {
        name: req.body.name,
        url: req.body.url
    };

    const page = pageModel.create(newPage);

    res.send(page);
});

module.exports = router;
var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

//pages
const pages = [
    {id: uuidv4(), 'name':'Home','url':'/'},
    {id: uuidv4(), 'name':'MUI','url':'/mui'},
    {id: uuidv4(), 'name':'Three','url':'/box_three'},
    {id: uuidv4(), 'name':'Example','url':'/example'}
];

// Get all pages
router.get('/', (req, res) => {
    res.send(
        {
            status: 'success',
            pages
        })
});

// Create page
router.post('/', (req, res) => {
    res.send(
        {status: 'success'}
    )
});

module.exports = router;
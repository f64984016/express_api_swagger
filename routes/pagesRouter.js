var express = require('express');
var router = express.Router();

//pages
const pages = [
    {'name':'Home','url':'/'},
    {'name':'MUI','url':'/mui'},
    {'name':'Three','url':'/box_three'},
    {'name':'Example','url':'/example'}
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
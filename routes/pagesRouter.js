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
    const {name, url} = req.body;
    // establish new object    
    const newPage = {
        name,
        url,
        id:uuidv4()
    }
    //  add object to array
    pages.push(newPage);

    // respond
    res.send(
        {status: 'success',
         page: newPage   
    })
});

module.exports = router;
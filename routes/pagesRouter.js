var express = require('express');
var router = express.Router();
const pageController = require('../controllers/pagesController');

// Get all pages
router.get(
    '/',
    /* 	#swagger.tags = ['Page']
        #swagger.description = '取得全部 pages' */
    /* #swagger.responses[200] = { 
      schema: [
        {
            "id": "fda7cb56-84d0-4b3b-accf-8fdf1e56257d",
            "name": "Home",
            "url": "/"
        }]
     } */
    pageController.getAllPages
);

// Get one page
router.get('/:id', pageController.getPagesById);

// Create page
router.post('/',
    /* 	#swagger.tags = ['Page']
        #swagger.description = '新增 page' */
    /*	#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Page內容',
        required: true,
        schema: { 
            "name": "這是顯示名稱",
            "url": "這是路由"            
         }
    } */
    /* #swagger.responses[200] = { 
      schema: {
            "id": "fda7cb56-84d0-4b3b-accf-8fdf1e56257d",
            "name": "Home",
            "url": "/"
        }
     } */
 pageController.createPage
);

// Update page
router.put('/:id', pageController.putPage);

// Delete page
router.delete('/:id', pageController.deletePage);

module.exports = router;
var express = require('express');
var router = express.Router();
const pageController = require('../controllers/pagesController');

const catchError = (asyncFn) => {
    return (req, res, next) => {
      asyncFn(req, res, next)
        .catch((err) => {
          console.log('錯誤捕捉:', err)
          res.status(500)
            .send({
              message: '伺服器錯誤'
            })
        }) // Promise
    };
  }

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
    catchError(pageController.getAllPages)
);

// Get one page
router.get('/:id',
    /* 	#swagger.tags = ['Page']
        #swagger.description = '取得 pages By id' */ 
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'Page ID.',
            required: true,
            type: 'string'
        }*/
    /*  #swagger.responses[200] = { 
        schema: [
            {
                "id": "fda7cb56-84d0-4b3b-accf-8fdf1e56257d",
                "name": "Home",
                "url": "/"
            }]
        } */
        catchError(pageController.getPagesById));

// Create page
router.post('/',
    /* 	#swagger.tags = ['Page']
        #swagger.description = '新增 page' */
    /*	#swagger.parameters['body'] = {
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
     catchError(pageController.createPage)
);

// Update page
router.put('/:id', catchError(pageController.putPage));

// Delete page
router.delete('/:id', catchError(pageController.deletePage));

module.exports = router;
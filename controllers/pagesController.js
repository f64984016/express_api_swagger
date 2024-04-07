var pageModel = require('../models/pagesModel');

// Controller 內的 CRUD 方法
exports.getAllPages = (req, res) => {
    const pages = pageModel.getAll();
    res.send(pages);
};

exports.createPage = (req, res) => {
    // Validation
    
    
    const newPage = {
        name: req.body.name,
        url: req.body.url
    };

    const page = pageModel.create(newPage);

    res.send(page);
};

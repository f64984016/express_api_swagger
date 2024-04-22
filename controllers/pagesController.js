var pageModel = require('../models/pagesModel');

// Controller 內的 CRUD 方法
exports.getAllPages = async (req, res) => {
    const pages = pageModel.getAll();
    res.send(pages);
};

exports.getPagesById = async (req, res) => {
    const { id } = req.params;
    const page = pageModel.getById(id);

    if (!page) {
        res.status(404).send('Page not found');
    }
    res.send(page);
};

exports.createPage = async (req, res) => {
    // Validation
    if (!req.body.name) {
        res.status(400).send('缺少 name 欄位');
    }
    if (!req.body.url) {
        res.status(400).send('缺少 url 欄位');
    }
    if (typeof req.body.name !== 'string') {
      res.status(400).send('name 欄位格式錯誤');
    }
    if (typeof req.body.url !== 'string' || req.body.url.charAt(0) !== '/') {
        res.status(400).send('url 欄位格式錯誤');
    }

    const newPage = {
        name: req.body.name,
        url: req.body.url
    };

    const page = pageModel.create(newPage);

    res.send(page);
};

exports.putPage = async (req, res) => {
    // Validation
    if (!req.body.name) {
        res.status(400).send('缺少 name 欄位');
    }
    if (!req.body.url) {
        res.status(400).send('缺少 url 欄位');
    }    
    if (typeof req.body.name !== 'string') {
        res.status(400).send('name 欄位格式錯誤');
    }
    if (typeof req.body.url !== 'string' || req.body.url.charAt(0) !== '/') {
        res.status(400).send('url 欄位格式錯誤');
    }
    // Retrieval id from querystring
    const { id } = req.params;
    // Get Obj
    const page1 = pageModel.getById(id);
    // Check whether Obj exist or not
    if (!page1) {
        res.status(404).send('查無該筆資料');
    }
    // Modify Obj
    const page2 = pageModel.put(id, req.body);
    // Response
    res.send(page2);
};

exports.deletePage = async (req, res) => {
    // Retrieval id from querystring
    const { id } = req.params;
    // Get Exist Obj
    const page1 = pageModel.getById(id);
    // Check whether Obj exist or not
    if (!page1) {
        res.status(404).send('查無該筆資料');
    } 
    // delete item from array
    const pageResult = pageModel.delete(id);
    //Response Removed Item
    res.send(pageResult);
};
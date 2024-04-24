var pageModel = require('../models/pagesModel.db');
const initData = require('../models/pagesData');

// Controller 內的 CRUD 方法
exports.getAllPages = async (req, res) => {
    const pages = await pageModel.getAll();
    res.send(pages);
};

exports.getPagesById = async (req, res) => {
    const { id } = req.params;
    const page = await pageModel.getById(id);
    
    if (page.length != 1) {
        return res.status(404).send({error: 'Page not found'});
    }
    res.send(page);
};

exports.createPage = async (req, res) => {
    // Validation
    if (!req.body.name) {
        return res.status(400).send({error: '缺少 name 欄位'});
    }
    if (!req.body.url) {
        return res.status(400).send({error: '缺少 url 欄位'});
    }
    if (typeof req.body.name !== 'string') {
        return res.status(400).send({error: 'name 欄位格式錯誤'});
    }
    if (typeof req.body.url !== 'string' || req.body.url.charAt(0) !== '/') {
        return res.status(400).send({error: 'url 欄位格式錯誤'});
    }

    const newPage = {
        name: req.body.name,
        url: req.body.url
    };

    const page = await pageModel.create(newPage);

    res.send(page);
};

exports.putPage = async (req, res) => {
    // Validation
    if (!req.body.name) {
        return res.status(400).send({error: '缺少 name 欄位'});
    }
    if (!req.body.url) {
        return res.status(400).send({error: '缺少 url 欄位'});
    }    
    if (typeof req.body.name !== 'string') {
        return res.status(400).send({error: 'name 欄位格式錯誤'});
    }
    if (typeof req.body.url !== 'string' || req.body.url.charAt(0) !== '/') {
        return res.status(400).send({error: 'url 欄位格式錯誤'});
    }
    // Retrieval id from querystring
    const { id } = req.params;
    // Get Obj
    const page1 = await pageModel.getById(id);
    // Check whether Obj exist or not
    if (page.length != 1) {
        return res.status(404).send({error: '查無該筆資料'});
    }
    // Modify Obj
    const page2 = await pageModel.put(id, req.body);
    // Response
    res.send(page2);
};

exports.deletePage = async (req, res) => {
    // Retrieval id from querystring
    const { id } = req.params;
    // Get Exist Obj
    const page1 = await pageModel.getById(id);
    // Check whether Obj exist or not
    if (page1.length != 1) {
        return res.status(404).send({error: '查無該筆資料'});
    } 
    // delete item from array
    const pageResult = await pageModel.delete(id);
    //Response
    res.send({deleteCount: pageResult});
};
var pageModel = require('../models/pagesModel');

// Controller 內的 CRUD 方法
exports.getAllPages = (req, res) => {
    const pages = pageModel.getAll();
    res.send(pages);
};

exports.createPage = (req, res) => {
    // Validation
    if (!req.body.name) {
        return res.status(400).send('缺少 name 欄位');
    }
    if (!req.body.url) {
        return res.status(400).send('缺少 url 欄位');
    }
    if (typeof req.body.name !== 'string') {
      return res.status(400).send('name 欄位格式錯誤');
    }
    if (typeof req.body.url !== 'string' || req.body.url.charAt(0) !== '/') {
        return res.status(400).send('url 欄位格式錯誤');
    }

    const newPage = {
        name: req.body.name,
        url: req.body.url
    };

    const page = pageModel.create(newPage);

    res.send(page);
};

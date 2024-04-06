const { v4: uuidv4 } = require('uuid');

class PageModel {
  constructor() {
    this.pages = [
        {id: uuidv4(), 'name':'Home','url':'/'},
        {id: uuidv4(), 'name':'MUI','url':'/mui'},
        {id: uuidv4(), 'name':'Three','url':'/box_three'},
        {id: uuidv4(), 'name':'Example','url':'/example'}
    ];
  }

  getAll() {
    return this.pages;
  }

  create(page) {
    const newPage = {
      ...page,
      id: uuidv4(),
    };
    this.pages.push(newPage);
    return newPage;
  }
}

module.exports = new PageModel();
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

  getById(id) {
    return this.pages.find((page) => page.id === id);
  }

  create(page) {
    // establish new object 
    const newPage = {
      ...page,
      id: uuidv4(),
    };
    //  add object to array
    this.pages.push(newPage);
    // response
    return newPage;
  }

  put(id, body) {
    const oldPage = this.pages.find((obj) => obj['id'] === id);
    const index = this.pages.indexOf(oldPage);

    const newPage = {
      ...body,
      id: id
    }

    this.pages.splice(index, 0, newPage);

    return newPage;
  }
}

module.exports = new PageModel();
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');

class PageModel { 
  constructor() {
    //
    this.pages = [
        {id: uuidv4(), 'name':'Home','url':'/'},
        {id: uuidv4(), 'name':'MUI','url':'/mui'},
        {id: uuidv4(), 'name':'Three','url':'/box_three'},
        {id: uuidv4(), 'name':'Example','url':'/example'}
    ];
    // Connection URL
    this.url = 'mongodb://root:P%40ssw0rd@172.17.223.192:27017/?authMechanism=DEFAULT';
    this.client = new MongoClient(this.url);
    // Database Name
    this.dbName = 'mytest';
    // Collection Name
    this.collectionName = 'pages';
  }

  async getAll() {
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to server');
    // get all pages collection
    const collection = this.client.db(this.dbName).collection(this.collectionName);
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    // response    
    return findResult;
  }

  async getById(id) {
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to server');
    // get pages collection
    const collection = this.client.db(this.dbName).collection(this.collectionName);
    // get page by id 
    const filteredDocs = await collection.find({ _id: new ObjectId(id) }).toArray();
    console.log('Found documents filtered by { _id: ObjectId(id) } =>', filteredDocs);
    // Response
    return filteredDocs;
  }

  async create(page) {
    // establish new object 
    const newPage = {
      ...page
    };
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to server');
    // get pages collection
    const collection = this.client.db(this.dbName).collection(this.collectionName);
    // insert one
    const insertResult = await collection.insertOne(newPage);
    console.log('Inserted documents =>', insertResult);
    // response
    return newPage;
  }

  async put(id, body) {
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to server');
    // get pages collection
    const collection = this.client.db(this.dbName).collection(this.collectionName);
    // update one
    const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });
    console.log('Updated documents =>', updateResult);
    // Response
    return updateResult;
  }

  delete(id) {
    // find exist page item
    const Page = this.pages.find((obj) => obj['id'] === id);
    // find index of page item
    const index = this.pages.indexOf(Page);
    // remove item
    this.pages.splice(index, 1);
    // return item removed
    return Page;
  }
}

module.exports = new PageModel();
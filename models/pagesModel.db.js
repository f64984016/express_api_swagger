const { MongoClient, ObjectId } = require('mongodb');

class PageModel { 
  constructor() {
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

  async delete(id) {
    // Use connect method to connect to the server
    await this.client.connect();
    console.log('Connected successfully to server');
    // get pages collection
    const collection = this.client.db(this.dbName).collection(this.collectionName);
    console.log(collection);
    // delete one
    const deleteResult = await collection.deleteMany({ _id: new ObjectId(id) });
    console.log('Deleted documents =>', deleteResult);
    // Response
    return deleteResult;
  }
}

module.exports = new PageModel();
const { MongoClient } = require('mongodb');

class MongoDBClient {
    constructor(uri, dbName) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db(this.dbName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }

    async insertOne(collectionName, document) {
        try {
            const result = await this.db.collection(collectionName).insertOne(document);
            return result;
        } catch (error) {
            console.error('Error inserting document:', error);
            return null;
        }
    }

    async findOne(collectionName, query) {
        try {
            const result = await this.db.collection(collectionName).findOne(query);
            return result;
        } catch (error) {
            console.error('Error finding document:', error);
            return null;
        }
    }

    async updateOne(collectionName, filter, update) {
        try {
            const result = await this.db.collection(collectionName).updateOne(filter, { $set: update });
            return result;
        } catch (error) {
            console.error('Error updating document:', error);
            return null;
        }
    }

    async deleteOne(collectionName, filter) {
        try {
            const result = await this.db.collection(collectionName).deleteOne(filter);
            return result;
        } catch (error) {
            console.error('Error deleting document:', error);
            return null;
        }
    }
}

module.exports = new MongoDBClient();
import {MongoClient} from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to dynamodb")
    const db = client.db('bfgjs-dev');
    const collection = db.collection('store');

//    await createDocument(collection);
//    await findDocument(collection);
//    await updateDocument(collection);
    await deleteDocument(collection);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

//Even though you haven’t provided the id field, notice there’s an id field present for your document. This is because if you don’t provide the _id field, the MongoDB driver will automatically create a unique id for the document.
async function createDocument(collection) {
  let studentDocument = {
    "name": 'John Smith',
    "birth": new Date(1993, 11, 20),
    "address": { "street": 'Pike Lane', "city": 'Los Angeles', "state": 'TN', 'zipcode': '37146' },
  }

  await collection.insertOne(studentDocument);
}

async function findDocument(collection) {
  const document = await collection.find({ name: 'John Smith' }).toArray();
  console.log(document)
}

async function updateDocument(collection) {
  await collection.updateOne({ name: 'John Smith' }, { '$set': { 'name': 'Zaki Amani' } })
}

async function deleteDocument(collection) {
  await collection.deleteOne({ 'address.zipcode': '37146'});
}

main();
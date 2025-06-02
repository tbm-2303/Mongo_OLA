import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'twitterDB';

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('tweets');

  if (req.method === 'GET') {
    const tweets = await collection.find({}).limit(10).toArray();
    res.status(200).json(tweets);
  } else if (req.method === 'POST') {
    const newTweet = req.body;

    if (!newTweet || !newTweet.user || !newTweet.text) {
      res.status(400).json({ error: 'Missing tweet data' });
      return;
    }

    const result = await collection.insertOne(newTweet);
    res.status(201).json({ insertedId: result.insertedId });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await client.close();
}

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uri = 'mongodb://localhost:27017';
const dbName = 'mydb';
let db;
MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const collection = db.collection('users');
  const user = await collection.findOne({ username });
  if (!user) {
    return res.status(401).send({ message: 'Incorrect username or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: 'Incorrect username or password' });
  }
  res.redirect('/index.html');
});
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const collection = db.collection('users');
  await collection.insertOne({ username, password: hashedPassword });
  res.send({ message: 'User created successfully' });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

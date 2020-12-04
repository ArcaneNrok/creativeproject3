const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/pathoslink', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/icons/',
  limits: {
    fileSize: 10000000
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  iconPath: String
});

const postSchema = new mongoose.Schema({
  poster: String,
  text: String,
  replies: Array,
});

const User = mongoose.model('users', userSchema);

const Post = mongoose.model('posts', postSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  console.log(extension);
  res.send({
    path: "/images/icons/" + req.file.filename
  });
});

app.post('/api/posts', async (req, res) => {
  const item = new Post({
    poster: req.body.poster,
    text: req.body.text,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    comment = await Post.findOne({_id: req.params.id});
    comment.text = req.body.description;
    comment.replies = req.body.replies
    comment.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    req.sendStatus(500);
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Comment.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    req.sendStatus(500);
  }
});

app.post('/api/users', async (req, res) => {
  const item = new User({
    username: req.body.username,
    password: req.body.password,
    iconPath: "/images/icons/anyGuy.svg"
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    user = await User.findOne({_id: req.params.id});
    console.log(user);
    user.username = req.body.username;
    user.password = req.body.password;
    user.iconPath = req.body.iconPath;
    console.log(user.iconPath)
    user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    req.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));

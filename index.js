const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const port = 2500;
const cors =require("cors")
const usersController = require('./controllers/users');
const musicController = require("./controllers/music")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.trim().replaceAll(" ", ""))
  }
})
const storageMusic = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname === "music") {
      cb(null, 'music/')
    } else {
      cb(null, 'image/')

    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.trim().replaceAll(" ", ""))
  }
})

const upload = multer({ storage:storage})
const uploadMusic = multer({storage:storageMusic})

app.use("/img", express.static("image")) // http://localhost:2500/img/namagambar.jpg
app.use("/song", express.static("music")) // http://localhost:2500/song/musik1.mp3
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded  ({extended:false}));

app.post('/image', uploadMusic.single("music"),musicController.createMusic)
app.post('/users/login', usersController.signIn)
app.post('/users/register', usersController.signUpAccount);
app.post('/music', uploadMusic.fields([
  {name: "music"}, {name:"image"}
]),musicController.createMusic)
// app.post('/music/song', upload.single("musik"),musicController.createMusic);
  
app.get('/music', musicController.musicGET);

app.listen(port, function() { 
  console.log(`Server Running on localhost:${port}`);
}); 
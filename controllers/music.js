const connection = require("../database/db");

function createMusic(req, res) {
  console.log(req.files.music)
//  Ambil data Nama Music -> req.file.originalName
// Query kyk biasa
  // const {tittle,song,song_artist,duration} = req.body

  connection.connection.query(`INSERT INTO music(tittle,song,song_artist,duration,image,file) VALUES ('${req.body.tittle}','${req.body.song}','${req.body.song_artist}','${req.body.duration}','http://localhost:2500/img/${req.files.image[0].originalname}', 'http://localhost:2500/song/${req.files.music[0].originalname}')`,
  function (err, result) {
    if (err) {
      res.status(400).send({
        message:err,
      });
    } else {
      res.status(201).send({
        message: "Succesfully Add Music"
      });
    }
  }
  );
}

function musicGET(req, res) {
  connection.connection.query(
    `SELECT * FROM music`,
    function (err, result) {
      console.log(result)
      if(err) {
        res.status(400).send({
          message: "Music Not Match",
        });
      } else {
        res.status(200).send({
          status: 200,
          data: result,
          message: "Succesfully Get Music",
        });
      }
    }
  );
}

module.exports ={createMusic, musicGET} 
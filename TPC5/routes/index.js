var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var lista = response.data
      res.render('musicas', { musicas: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});


router.get('/musicas', function (req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var lista = response.data
      res.render('musicas', { musicas: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});

router.get('/musicas/prov', function (req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var data = response.data.map(d => d.prov);
      let cleanData = [];

      data.forEach((word, index) => {
        if (data.indexOf(word) == index) {
          cleanData.push(word)
        }
      });
      res.render('provincias', { provincias: cleanData.sort() });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});

router.get('/musicas/:id', function (req, res, next) {
  axios.get("http://localhost:3000/musicas/" + req.params.id)
    .then(response => {
      var data = response.data
      res.render('musica', { id: req.params.id, musica: data });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});


router.get('/musicas/prov/:prov', function (req, res, next) {
  axios.get("http://localhost:3000/musicas?prov=" + req.params.prov)
    .then(response => {
      var lista = response.data
      res.render('provincia', { prov: req.params.prov, provincia: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});


router.post('/musicas/newMusic', function (req, res) {
  /*console.log(req.body.tit);
  console.log(req.body.prov);
  console.log(req.body.local);
  console.log(req.body.file);
  console.log(req.body.duracao);
  */
  var data = {
    'tit': req.body.tit,
    'prov': req.body.prov,
    'local': req.body.local,
    'file': req.body.file,
    'duracao': req.body.duracao
  }
  console.log(data)
  axios.post("http://localhost:3000/musicas", data)
    .then(response => {
      console.log("Adicionada música")
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
  res.redirect('/');
});

module.exports = router;

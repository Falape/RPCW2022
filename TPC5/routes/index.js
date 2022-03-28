var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.get('/musicas/:id', function (req, res, next) {
  axios.get("http://localhost:3000/musicas/id")
    .then(response => {
      var lista = response.data
      res.render('musica', { musica: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});

router.get('/musicas/prov', function (req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var lista = response.data
      res.render('provincias', { provincias: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});

router.get('/musicas/prov/:nome', function (req, res, next) {
  axios.get("http://localhost:3000/musicas?prov=nome")
    .then(response => {
      var lista = response.data
      res.render('provincia', { provincia: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});
module.exports = router;

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

router.get('/musicas/prov', function (req, res, next) {
  axios.get("http://localhost:3000/musicas")
    .then(response => {
      var data = response.data.map(d => d.prov);
      let cleanData = [];
      
      data.forEach((word,index) => {
        if(data.indexOf(word) == index){
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
  axios.get("http://localhost:3000/musicas/"+req.params.id)
    .then(response => {
      var data = response.data
      res.render('musica', {id: req.params.id, musica: data });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});


router.get('/musicas/prov/:prov', function (req, res, next) {
  axios.get("http://localhost:3000/musicas?prov="+req.params.prov)
    .then(response => {
      var lista = response.data
      res.render('provincia', {prov: req.params.prov ,provincia: lista });
    })
    .catch(function (erro) {
      res.render('error', { error: erro });
    })
});

module.exports = router;

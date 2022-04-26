var express = require('express');
var router = express.Router();
var Para = require('../controllers/para')

/* GET home page. */
router.get('/paras', function(req, res) {
  Para.listar()
    .then(dados => {
      console.log("dados do Get dos dados: " + dados)
      if(dados != []){
        res.status(200).jsonp(dados);
      }else{
        res.status(200);
      }
      
    })
    .catch( e => {
      console.log("Manda alguma coisa para a rua.")
      res.status(500).jsonp({erro:e})
    })
  //res.render('index', { title: 'Express' });
});

router.post('/paras', function(req, res) {
  console.log("entra no post com o res: ");
  Para.inserir(req.body)
  .then(dados => {
    res.status(201).jsonp(dados);
    console.log(req.body)
    })
    .catch( e => {
      res.status(501).jsonp({erro:e})
    })
  //res.render('index', { title: 'Express' });
});

router.get('/paras/delete/:id', function(req, res) {
  console.log(req.params.id)
  Para.delete(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados);
    })
    .catch( e => {
      console.log("Manda alguma coisa para a rua.")
      res.status(500).jsonp({erro:e})
    })
  //res.render('index', { title: 'Express' });
});

module.exports = router;

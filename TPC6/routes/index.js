var express = require('express');
var router = express.Router();

var Images = require('../controller/images');
const images = require('../models/images');

//upload de ficheiros
var multer = require('multer')
var upload = multer({dest: 'uploads'})

//filesystem
var fs = require('fs')


/* GET home page. */
router.get('/', function (req, res, next) {
  //var date = new Date().toISOString().substring(0.16)
  //var files = jsonfile.readFileSync('')
  console.log("Entra aqui")
  Images.list()
    .then(data => {console.log(data); 
                  res.render('mainPage', { imagens: data })})
    .catch(error => res.render('error', { error: error }))
});

router.post('/addImg', upload.single('fileSelect'), (req, res) => {
  let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../fileStore/' + req.file.originalname

  console.log('teste1')
  //para dar "store do file" no fileStore
  fs.rename(oldPath, newPath, error => {
    if (error) throw res.render('error', { error: error })
  })

  var d = new Date().toISOString().substring(0.16)
  //var files = jsonfile.readFileSync('./dbFiles.json')

  var img = {
    nome: req.file.originalname,
    tamanho: req.file.size,
    extensao: req.file.type,
    data: d,
    path: newPath
  }

  console.log(img)

  Images.insert(img)
    .then(data => res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

router.get('/remove/:id', (req, res) => {
  Images.delete(req.params.id)
    .then(data => res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

module.exports = router;

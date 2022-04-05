var express = require('express');
var router = express.Router();

var Images = require('../controller/images');
const images = require('../models/images');

//upload de ficheiros
var multer = require('multer')
var upload = multer({dest: 'uploads'})

//filesystem
var fs = require('fs')

//image stream
const stream = require('stream')

/* GET home page. */
router.get('/', function (req, res, next) {
  
  Images.list()
    .then(data => res.render('mainPage', { imagens: data }))
    .catch(error => res.render('error', { error: error }))
});

router.post('/addImg', upload.single('fileSelect'), (req, res) => {
  let dir = __dirname.split('/');
  dir.pop();
  dir = dir.join('/');
  console.log(dir);

  let oldPath = dir + '/' + req.file.path
  let newPath = dir + '/fileStore/' + req.file.originalname

  //para dar "store do file" no fileStore
  fs.rename(oldPath, newPath, error => {
    if (error) throw res.render('error', { error: error })
  })

  var d = new Date().toISOString().substring(0.16)

  var img = {
    nome: req.file.originalname,
    tamanho: req.file.size,
    extensao: req.file.mimetype,
    data: d,
    path: newPath
  }

  Images.insert(img)
    .then(res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

router.get('/remove/:id', (req, res) => {
  Images.delete(req.params.id)
    .then(res.redirect('/'))
    .catch(error => res.render('error', { error: error }))
})

router.get('/home/falape/Projetos/RPCW2022/TPC6/fileStore/:file', (req, res) => {
  console.log(req.url)
  const r = fs.createReadStream(req.url) 
  const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
  stream.pipeline(
   r,
   ps, // <---- this makes a trick with stream error handling
   (err) => {
    if (err) {
      res.render('error', { error: err })
    }
  })
  ps.pipe(res) 
})



module.exports = router;

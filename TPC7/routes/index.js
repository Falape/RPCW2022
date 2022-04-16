var express = require('express');
var router = express.Router();

var axios = require('axios');

var apikey = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGNiYTg0OWJhYmI2NjdjYmZkYzE2ZSIsImlhdCI6MTY0OTE5NTY1MiwiZXhwIjoxNjUxNzg3NjUyfQ.EuvH713Qr6IZ073-5FMF6j5p_3tb6Trv0TOOF5ZHWOPUlCBqKU1H9DTo_ueoCyWhPbEd6F8xzNvn-UkG3J8Ppq65xF8uukoElnSIsi3kldXI2E_EHMv5ETIq-2SGpiBmLyv1zu2broi-nXw18XwKM-WWpoumw5mZacg1qyj4kokGm--WzPIDD15Uibu2ObsDfeHpbDt81Npq-WgEVe56F5w0TdAvY_b-Xvm77hXI4MuaatL9bsOtYEyiepLuBelDyVWjAIoon3-7tB1lwrPnC0OJ_cxKUyCdqx8sZPkmciyTmBsV8fDTyvTP1ibiryAQsDRK5TrG83CcWmStZyDnoQ';

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('entra')
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1", {
    headers: {
      'Authorization': `apikey ${apikey}`
    }
  }).then( resp => {
    res.render('mainPage', {parente:'', dataClass1: resp.data })
  }).catch( err => {
    res.render('error', { title: "error", message: err })
  })
});

router.get('/:codigo', function(req, res, next) {
  console.log('entra com o código: '+ req.params.codigo)
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c"+req.params.codigo, {
    headers: {
      'Authorization': `apikey ${apikey}`
    }
  }).then( resp => {
    console.log(resp.data.codigo)
    switch(resp.data.nivel){
      case 1:
        res.render('classDescendents', {parente:'', info: resp.data, descendente: resp.data.filhos });
        break;
      case 2:
        res.render('classDescendents', {parente:resp.data.pai, info: resp.data, descendente: resp.data.filhos });
        break;
      case 3:
        console.log(resp.data);
        var data = []
        resp.data.processosRelacionados.forEach(element => {
          if(element.idRel == 'eCruzadoCom' 
          || element.idRel == 'eComplementarDe' 
          || element.idRel == 'eSuplementoDe' 
          || element.idRel == 'eSuplementoPara'){

            data.push(element)
          }
        });
        
        
        res.render('class3Page', {parente:resp.data.pai, info: resp.data, descendente: resp.data.filhos, relacionado:data });
        break;
      case 4:
        break;
    }    
  }).catch( err => {
    res.render('error', { title: "error", message: err })
  })
});

module.exports = router;

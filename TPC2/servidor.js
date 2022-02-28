var http = require('http')
var url = require('url')
var fs = require('fs')

myserver = http.createServer(function (req, res) {
    //var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url);
    var myurl = url.parse(req.url, true).pathname  // senão tivesse o pathname podia fazer split do url pelo ? e depois retirar os valores
    
    
    myurl = myurl.substring(1)
    console.log(myurl)
    myurl = myurl.split('/')
    console.log(myurl)
    if(myurl.length<3 && myurl.length>0){
        res.writeHead(200, {'Content-Type': "text/html; charset=uft-8"})
        if((myurl[1]=='' && myurl.length==2) || myurl.length==1 ){
            console.log("./"+ myurl[0]+"/index.html")
            fs.readFile("./"+ myurl[0]+"/index.html", function(err,data) {
            
                if(err){
                    res.write("<p>Erro na leitura do ficheiro</p>")
                }else{
                    res.write(data)
                }
                res.end()
            })
        }else{
            if(myurl.length==2){
                fs.readFile("./"+ myurl[0]+"/"+myurl[1], function(err,page) {
            
                    if(err){
                        res.write("<p>Erro na leitura do ficheiro</p>")
                    }else{
                        res.write(page)
                    }
                    res.end()
                })
            }else{
                res.write("<p>Rota não suportada: " + req.url + "</p>")
                res.end()
            }
        }
    }
})

myserver.listen(7777);
console.log("Estou à escuta na porta 7777!")

//um possível query feita o URL
//localhost:7777/soma?a=12&b=27
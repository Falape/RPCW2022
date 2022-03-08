var http = require('http')
var url = require('url')
var fs = require('fs')

myserver = http.createServer(function (req, res) {
    if (req.method == "GET") {
        console.log(req.method + " " + req.url);
        var myurl = url.parse(req.url, true).pathname


        myurl = myurl.substring(1)
        console.log(myurl)
        myurl = myurl.split('/')
        console.log(myurl)

        if (myurl[myurl.length - 1] == '') {
            myurl.pop();
        }

        if (myurl[myurl.length - 1].includes('css')) {
            if(myurl.length==2){
                res.writeHead(200, { 'Content-Type': "text/css; charset=uft-8" })
                fs.readFile("./" + myurl[0] + "/" + myurl[1], function (err, page) {

                    if (err) {
                        res.write("<p>Erro na leitura do ficheiro</p>")
                    } else {
                        res.write(page)
                    }
                    res.end()
                })
            }
            
        }else{
            res.writeHead(200, { 'Content-Type': "text/html; charset=uft-8" })
            switch (myurl.length) {
                case 1:
                    console.log("./" + myurl[0] + "/index.html")
                    fs.readFile("./" + myurl[0] + "/index.html", function (err, data) {

                        if (err) {
                            res.write("<p>Erro na leitura do ficheiro</p>")
                        } else {
                            res.write(data)
                        }
                        res.end()
                    })
                    break;
                case 2:
                    fs.readFile("./" + myurl[0] + "/" + myurl[1], function (err, page) {

                        if (err) {
                            res.write("<p>Erro na leitura do ficheiro</p>")
                        } else {
                            res.write(page)
                        }
                        res.end()
                    })
                    break;
                default:
                    res.write("<p>Rota não suportada: " + req.url + "</p>")
                    res.end()
                    break;
            }
        }
    }
})

myserver.listen(7777);
console.log("Estou à escuta na porta 7777!")

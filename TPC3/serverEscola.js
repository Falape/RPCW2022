var http = require('http')
var url = require('url')
const axios = require('axios')

const jsonServer = 'http://localhost:3000/'
const listingDoor = 7777;

//realiza get ao json-server
function jsonServerGet(path) {
    console.log("o path: " + jsonServer + path)
    return axios.get(jsonServer + path).then((resp) => resp.data)
}

//nav bar simples
function navbar() {
    htmlNav = []
    paths = ['alunos', 'cursos', 'instrumentos']
    for (var i = 0; i < paths.length; i++) {
        htmlNav.push('<div class="background link-container">')
        htmlNav.push('<a class="nav-entry" href=' + 'http://localhost:'+ listingDoor + '/' + paths[i] + '>' + paths[i] + '</a>')
        htmlNav.push('</div>')
    }
    return htmlNav
}

//trata das tabelas para as páginas alunos, instrumentos e cursos
function makeHtmlTable(entidade, data) {
    const htmlTable = []
    const header = []
    /* Objetivo era quando se trata-se de um aluno, fazer um requeste ao json server dos 
    instrumentos e guardar num objeto para depois ao fazer a tabela do aluno descobrir pelo 
    nome do instrumento o seu ID para gerar o URL

    const instrumentosAlunos = {}
    const populateData = (data) => {
        for (var i = 0; i < data.length; i++) {
            instrumentosAlunos[data[i]['#text']] = data[i]['id']
        }
        console.log(instrumentosAlunos)
    } 
    if (entidade == 'alunos') {
        jsonServerGet('instrumentos')
            .then((data) => {
                console.log(data)
                populateData(data)
                //var page = makeHTMLpage(myurl, data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    */
    htmlTable.push("<table>")
    htmlTable.push("<tr>")

    for (var key in data[0]) {  //tiro as "keys"
        if (header.indexOf(key) === -1) {
            header.push(key);
            htmlTable.push('<td>' + key + '</td>')
        }
    }
    htmlTable.push("</tr>")

    for (var objeto in data) {

        htmlTable.push("<tr>")
        for (var head in header) {

            if (header[head] == 'id' || header[head] == 'curso' || header[head] == 'instrumento') {

                if (entidade == 'cursos' && header[head] == 'instrumento') {
                    htmlTable.push('<td> <a href="http://localhost:' + listingDoor + '/' + header[head] + 's' + '/' + data[objeto][header[head]]['id'] + '">' + data[objeto][header[head]]['#text'] + '</a></td>')
                } else

                    if (entidade == 'alunos' && header[head] == 'instrumento') {
                        //console.log(instrumentosAlunos[data[objeto][header[head]]])
                        //htmlTable.push('<td> <a href="http://localhost:' + listingDoor + '/' + entidade + '/' + instrumentosAlunos[data[objeto][header[head]]] + '">' + data[objeto][header[head]] + '</a></td>')
                        htmlTable.push('<td>' + data[objeto][header[head]] + '</td>')
                    } else

                        if (header[head] == 'id') {
                            htmlTable.push('<td> <a href="http://localhost:' + listingDoor + '/' + entidade + '/' + data[objeto][header[head]] + '">' + data[objeto][header[head]] + '</a></td>')
                        }

                        else {
                            htmlTable.push('<td> <a href="http://localhost:' + listingDoor + '/' + header[head] + 's' + '/' + data[objeto][header[head]] + '">' + data[objeto][header[head]] + '</a></td>')
                        }

            } else {
                htmlTable.push('<td>' + data[objeto][header[head]] + '</td>')
            }
        }
        htmlTable.push("</tr>")
    }
    htmlTable.push("</table>")
    return htmlTable;
}

function makeHtmlEntity(url, data) {
    const htmlList = []
    console.log(data)
    htmlList.push('<dl>')
    for (var k in data) {
        htmlList.push('<dt>' + k + ':</dt>')
        if (url == 'cursos' && k == 'instrumento') {
            htmlList.push('<dd> <a href="http://localhost:' + listingDoor + '/' + k + 's' + '/' + data[k]['id'] + '">' + data[k]['#text'] + '</a></dd>')
        } else
            if (url == 'alunos' && k == 'curso') {
                htmlList.push('<dd> <a href="http://localhost:' + listingDoor + '/' + k + 's' + '/' + data[k] + '">' + data[k] + '</a></dd>')
            } else
                htmlList.push('<dd>' + data[k] + '</dd>')
    }
    htmlList.push('</dl>')
    return htmlList
}

myserver = http.createServer(function (req, res) {
    console.log(req.method + " " + req.url);
    var myurl = url.parse(req.url, true).pathname  // senão tivesse o pathname podia fazer split do url pelo ? e depois retirar os valores

    myurl = myurl.substring(1)  //para remover / do início
    console.log(myurl)
    myurl = myurl.split('/')
    console.log(myurl[0])
    console.log("com size: " + myurl.length)

    if (myurl[myurl.length - 1] == ''&& myurl.length>1) {
        myurl.pop();
    }

    res.writeHead(200, { 'Content-Type': "text/html; charset=utf-8" });
    switch (myurl.length) {
        case 1: //para a main, para as outras páginas temos de fazer o get para depois fazer o html
            if (myurl[0] == '') {
                var page = navbar()
                res.write(page.join('\n'))
                res.end()
            } else {

                jsonServerGet(myurl)
                    .then((data) => {
                        //console.log(data[1])
                        var page = navbar()
                        page = page.concat(makeHtmlTable(myurl[0], data))
                        res.write(page.join('\n'));
                        res.end()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            break
        case 2:
            jsonServerGet(myurl.join('/'))
                .then((data) => {
                    var page = navbar()
                    page = page.concat(makeHtmlEntity(myurl[0], data))
                    res.write(page.join('\n'));
                    res.end()
                })
                .catch(function (error) {
                    console.log(error);
                });
            break
        default:
            res.write("<p>Rota não suportada: " + req.url + "</p>")
            res.end()
            break
    }
})

myserver.listen(listingDoor);
console.log("Estou à escuta na porta " + listingDoor + "!")


var http = require('http')
var axios = require('axios')
var page = require('./makepage.js')
var static = require('./static.js')
//var fs = require('fs')
var { parse } = require('querystring')

//Variáveis Globais

const jsonServer = 'http://localhost:3001/notes';
const listingDoor = 7777;
const serverURL = 'http://localhost:' + listingDoor;
const toDoTag = "?Estado=todo";
const doneTag = "?Estado=done";

//Funções Auxiliares
function remove(id) {
    return axios.delete(jsonServer + '/' + id);
}

function getToDo() {
    return axios.get(jsonServer + toDoTag);
}

function getDone() {
    return axios.get(jsonServer + doneTag);
}

function addEntry(data) {
    return axios.post(jsonServer, data);
}

function edit(id, data) {
    return axios.put(jsonServer + '/' + id, data);
}

function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

var noteServer = http.createServer(function (req, res) {
    console.log("URL que chega: "+req.url)
    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                //GET /->mainpage
                if ((req.url == "/")) {
                    axios.all([getToDo(), getDone()])
                        .then(axios.spread(function (todo, done) {
                            //console.log(todo.data, done.data)
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            console.log(serverURL)
                            data = page.mainPage(todo.data, done.data, serverURL)
                            res.write(data)
                            res.end()
                        }))
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista...")
                            res.write('<p><a href="/">voltar</a></p>')
                            res.end()
                        })
                } else
                    if (req.url.includes("delete")) {
                        const regexID = /\/:([0-9]+)\/delete/;
                        const id = req.url.match(regexID)
                        remove(id[1]).then(resp => {
                            /*res.writeHead(301, {
                                Location: serverURL
                            })
                            axios.defaults.baseURL = serverURL + '/'
                            axios({
                                url: '/' //=>  http://wwww.example.com/cats
                            })
                            res.end()*/
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Removido</p>")
                            res.write('<p><a href="/">voltar</a></p>')
                            res.end()
                        })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write("<p>Erro no Delete: " + erro + '</p>')
                                res.write('<p><a href="/">voltar</a></p>')
                                res.end()
                            })
                        console.log(id[1])
                    } else
                        if (req.url.includes('done')) {
                            console.log("Done ")
                            const regexID = /\/:([0-9]+)\/done/;
                            const id = req.url.match(regexID)
                            console.log(id)
                            edit(id[1], { "Estado": "done" })
                                .then(resp => {
                                    console.log("Passa a done")
                                    /*res.writeHead(301, {
                                        Location: serverURL
                                    })
                                    axios.defaults.baseURL = serverURL + '/'
                                    axios({
                                        url: '/' //=>  http://wwww.example.com/cats
                                    })
                                    res.end()*/
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Passado para done</p>")
                                    res.write('<p><a href="/">voltar</a></p>')
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Erro no Edit: " + erro + '</p>')
                                    res.write('<p><a href="/">voltar</a></p>')
                                    res.end()
                                })
                        }
                break
            case "POST":

                console.log(req.url)

                if (req.url == "/newEntry") {
                    recuperaInfo(req, resultado => {
                        resultado['Estado'] = 'todo'
                        //console.log('POST:' + JSON.stringify(resultado))
                        axios.all([addEntry(resultado)])
                            .then(axios.spread(function (respPost) {
                                //console.log(todo.data, done.data)
                                /*
                                res.writeHead(301, {
                                    Location: serverURL + '/'
                                })
                                axios.defaults.baseURL = serverURL
                                axios({
                                    url: '/' //=>  http://wwww.example.com/cats
                                })
                                res.end()*/

                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write("<p>Nota adicionda </p>")
                                res.write('<p><a href="/">voltar</a></p>')
                                res.end()
                            }))
                            .catch(function (erro) {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write("<p>Erro no POST: " + erro + '</p>')
                                res.write('<p><a href="/">voltar</a></p>')
                                res.end()
                            })
                    })
                }
                break
        }
    }
})


noteServer.listen(listingDoor);
console.log("Estou à escuta na porta " + listingDoor + "!")

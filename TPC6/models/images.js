var mongoose = require('mongoose')

var imagesSchema = new mongoose.Schema({
    nome: String,
    tamanho: Number,
    extensao: String,
    data: String,
    path: String
})

module.exports = mongoose.model('images', imagesSchema)
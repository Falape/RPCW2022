const Para = require('../models/para');
var mongoose = require('mongoose')


module.exports.listar = function () {
    return Para
        .find()
        .exec()
}


module.exports.delete = id => {
    return Para
        .deleteOne({ _id: mongoose.Types.ObjectId(id) });
}

module.exports.inserir = function(p) {
    console.log("string")
    var data = new Date()
    p.data = data.toISOString().substring(0,16)
    var novo = new Para(p)
    return novo.save()
}
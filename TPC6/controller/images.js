const mongoose = require('mongoose')
const student = require('../models/images')

var Images = require('../models/images')

module.exports.list = () => {
   
    var imgs = Images
        .find()  //procurar parametros
        .sort()
        .exec()
    console.log(imgs)
    return imgs
    /*Images
        .find()  //procurar parametros
        .sort()
        .exec()*/
}

module.exports.lookUp = id => {   //transformar id que recebo e transformo num id do mongo
    return Images
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec()
}

module.exports.delete = id => {
    return Images
        .deleteOne({ _id: mongoose.Types.ObjectId(id) });
}

module.exports.insert = img => {
    var newImage = new Images(img)
    return newImage.save()
}
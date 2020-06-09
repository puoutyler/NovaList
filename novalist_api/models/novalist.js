const {Schema, model} = require('mongoose')

const novaListSchema = Schema({
    title: String,
    author: String
})

const novaList = model('novaList', novaListSchema)

module.exports = novaList
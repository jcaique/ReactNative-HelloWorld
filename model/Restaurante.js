const mongoose = require('mongoose');
const Schema = mongoose.Schema


const RestauranteSchema = mongoose.Schema({
    nome : {type: String, unique:true},
    status: {type : String , enum :['ativo', 'inativo'], default: 'ativo'},
    foto: {
        originalName: {type:String}, path: {type: String},
        size: {type: Number}, mimeType: {type: String}
    },
//continuar daqui
    notaMedia: {type:Number},
    categoria: {type:Schema.Types.ObjectId, ref:'categoria'},
    faixaPreco: {type:String, enum:['barato', 'medio', 'luxo']},
    tempoEntrega: {type: String},
    endereco:{
        logradouro: { type:String}, barato:{type:String},
        cep: {type:String}, municipio:{type:String}, estado:{type:String},
        complemento: {type:String}
    },
    geolocalizacao: {
        latitude: {type:Number},
        longitude: {type:Number}
    }
},{timestamps:true})

module.exports = mongoose.model('restaurante', RestauranteSchema)
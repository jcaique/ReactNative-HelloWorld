const mongoose = require('mongoose');

//criando o schema categoria "uma tabela"
const CategoriaSchema = mongoose.Schema({
    nome: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    },
    foto: {
        originalName: { type: String },
        path: { type: String },
        size: { type: Number },
        mimeType: { type: String }
    }
}, { timestamps: true }); //registra a data e a hora do registro


module.exports = mongoose.model('categoria', CategoriaSchema);
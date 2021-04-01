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
    }
}, { timestamps: true });


module.exports = mongoose.model('categoria', CategoriaSchema);
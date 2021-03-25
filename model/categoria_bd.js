const bancoMongo = require('mongoose');

//criando o schema categoria "uma tabela"
const CategoriaSchema = bancoMongo.Schema({
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


module.exports = bancoMongo.model('categoria', CategoriaSchema);
const mongoose = require('mongoose');

const urlDoBanco = process.env.MONGODB_URL;

const InicializaMongoServer = async () => {
    try {
        await mongoose.connect(urlDoBanco, {
            useNewUrlParser: true, //Forçando a utilização do ultimo parser de url
            useCreateIndex: true, //quando necessario, utilizará a criaçao de indices
            useFindAndModify: false, //o padra é encontrar e alterar todos, esse false cancelar o padrao
            useUnifiedTopology: true //utilizamos e engie para descoberta de servidores
        });
        console.log('🔌 Conectado ao MONGO DB! 🔌');
    } catch (e) {
        console.error(e);
        throw e; //nos mostrara os detalhes do erro
    }
}

module.exports = InicializaMongoServer;
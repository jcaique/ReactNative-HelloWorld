require('dotenv').config(); //carrega as variaveis ambientes
const express = require('express');
const InicializaMongoServer = require('./config/bancoDeDados_Conexao');

//Definindo as rotas da aplicação
const rotasCategorias = require('./routes/Categoria');
const rotasRestaurantes = require('./routes/Restaurante');

InicializaMongoServer();

const app = express();

//porta default
const PORT = process.env.PORT;

//parse conteudo json
app.use(express.json());

app.get('/', (req, res) => {
    const idiomas = req.headers['accept-language'];

    res.json({
        mensagem: 'API IComida 100% funcional',
        versao: '1.0.0',
        idiomas: idiomas
    });
});

//Rotas das categorias
app.use('/categorias', rotasCategorias);

app.use('/restaurantes', rotasRestaurantes );

app.listen(PORT, (req, res) => {
    console.log(`🆙Servidor web iniciado na porta ${PORT}🆙`);
});
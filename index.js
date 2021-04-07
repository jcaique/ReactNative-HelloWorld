require('dotenv').config(); //carrega as variaveis ambientes
const express = require('express');
const InicializaMongoServer = require('./config/bancoDeDados_Conexao');

//Definindo as rotas da aplicação
const rotasCategorias = require('./routes/Categoria');
const rotasRestaurantes = require('./routes/Restaurante');
const rotaUpload = require('./routes/Upload');

InicializaMongoServer();

const app = express();

//porta default
const PORT = process.env.PORT;

//middleware express
app.use(function (req, res, next) {
    //em produção remover o * e atualizar com o dominio/ip do app
    res.header('Access-Control-Allow-Origin', '*')
    //cabecalhos    que serao permitidos
    res.setHeader('Access-Control-Allow-Headers', '*')
    //medotodos que serao permitidos
    res.setHeader('Access-Controll-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION,PATCH')
    next()
})

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

//Rotas do restaurante
app.use('/restaurantes', rotasRestaurantes);

//rotas do conteudo publico
app.use('/public', express.static('public'));

//rotas de upload
app.use('/upload', rotaUpload);

//rota para tratar algo não há no meu site - famoso not found 404 (tem que ser sempre a ultima)
app.use(function (req, res) {
    res.status(404).json({ message: `A rota ${req.originalUrl} não exite` });
})

app.listen(PORT, (req, res) => {
    console.log(`🆙Servidor web iniciado na porta ${PORT}🆙`);
});
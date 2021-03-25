const express = require('express');
const rota = express.Router();
const Categoria = require('../model/categoria_bd');

/**
 * LISTA TODAS AS CATEGORIAS
 * GET /categorias
 */
rota.get('/', async (req, res) => {
    try {
        //inserindo nesta variavel o equivalente a um select * from categoria where status=ativo order by nome desc
        const categorias = await Categoria.find({ 'status': 'ativo' }).sort({ nome: 1 }); //encontre as categorias no banco por favor
        res.json(categorias) //responda em json as categorias que voce achar
    } catch (e) {
        res.status(500).send({
            errors: [{ mensagem: 'Não foi possivel obter as categorias' }]
        });

        console.error(e);
    }
});


module.exports = rota;
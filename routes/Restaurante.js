const express = require('express');
const rota = express.Router();
const Restaurante = require('../model/Restaurante');
const { check, validationResult } = require('express-validator');


//-->   Listar todos os restaurantes
rota.get('/', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find({ 'status': 'ativo' }).sort({ nome: 1 });
        res.json(restaurantes);
    } catch (error) {
        res.status(500).send({
            errors: [{ mensagem: 'Não foi possivel obter os restaurantes!' }]
        });
        console.error(error);
    }
});


//--> Listar nome por id GET/:id - ao colocar /:id espera-se um paramentro 
rota.get('/:id', async (req, res) => {
    try {
        const restaurante = await Restaurante.findOne(req.params.id);
        res.json(restaurante);
    } catch (error) {
        res.status(500).send({
            errors: [{ message: `Não foi possivel encontrar o restaurante com o id ${req.params.id}` }]
        });
        console.error(error);
    }
});

//--> Validação dos modelos de dados a serem salvos no banco referente ao restaurante
const validaRestaurante = [
    check('nome').not().isEmpty().withMessage('Por favor insira um nome para o restaurante')
        .isLength({ min: 5, max: 50 }).withMessage('Ops, informe um nome com no minimo 5 e maximo 50 carac.'),
    check('status').isIn(['ativo', 'inativo']).withMessage('OPS, informe ativo ou inativo para status'),

]
//--> Incluindo um registro no banco POST
rota.post('/', async (req, res) => {

})


//Aula 07-04
//lista restaurante por categoria
rota.get('/categoria/:id', async (req, res) => {
    try {
        const restaurantes = await Restaurante
            .find({ "categoria": req.params.id })
            .sort({ nome: 1 })
            .populate("categoria", "nome");
        res.json(restaurantes);
    } catch (error) {
        res.status(500).send({
            errors: [{ message: `Não foi possivel encontrar o restaurante com o id da categoria ${req.params.id}` }]
        });
        console.error(error);
    }
});













module.exports = rota;
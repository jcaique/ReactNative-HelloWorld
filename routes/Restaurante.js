const express = require('express');
const rota = express.Router();
const Restaurante = require('../model/Restaurante');
const { check, validationResult } = require('express-validator');


/*************************************
* Lista todos os restaurantes
* GET /restaurantes
**************************************/
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

/*************************************
* Lista um restaurante pelo id
* GET /restaurantes/:id
************************************* */
rota.get('/:id', async (req, res) => {
    try {
        const restaurante = await Restaurante.findById(req.params.id);
        res.json(restaurante);
    } catch (error) {
        res.status(500).send({
            errors: [{ message: `Não foi possivel encontrar o restaurante com o id ${req.params.id}` }]
        });
        console.error(error);
    }
});

/********************************************
* Lista um restaurante pelo id da Categoria
* GET /restaurantes/categoria/:id
*********************************************/
rota.get('/restaurantes/categoria/:id', async (req, res) => {
    try {
        const restaurantes = await Restaurante
            .find({ "categoria": req.params.id })
            .sort({ "nome": '' })
            .populate("categoria", "nome")

        res.json(restaurantes)
    } catch (err) {
        res.status(500).send({
            erros: [{ message: `Não foi possível obter o restaurante com o id categoria ${req.params.id}` }]
        })
    }
})

/**
 * Inclui um novo restaurante 
 * POST /restaurantes
 */
const validaRestaurante = [
    check('nome')
        .not()
        .isEmpty()
        .withMessage('Por favor insira um nome para o restaurante')
        .isLength({ min: 5, max: 50 }).withMessage('Ops, informe um nome com no minimo 5 e maximo 50 carac.'),

    check('status')
        .isIn(['ativo', 'inativo'])
        .withMessage('OPS, informe ativo ou inativo para status'),

    check('notaMedia')
        .isNumeric()
        .withMessage('A nota média deve ser um numero')
        .isFloat({ min: 0, max: 5 }).withMessage('A nota deve ser um número entre 0 e 5'),

    check('categoria')
        .isMongoId()
        .trim().withMessage('A categoria do restaurnte é invalida'),

    check('faixaPreco', 'A faixa de preço informada é invalida')
        .isIn(['barato', 'medio', 'luxo'])
]
//--> Incluindo um registro no banco POST
rota.post('/', async (req, res) => {
    const errors = validaRestaurante(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array
        })
    }

    //verifica se o reastaurante já existe
    const nome = req.body
    let restaurante = await Restaurante.findOne({ nome })
    if (restaurante)
        return res.status(200).json({
            errors: [{message: 'Já existe um    restaurante com esse nome informado'}]
        })
    try {
        let restaurante = new Restaurante()
    } catch (error) {
        
    }
})

module.exports = rota;
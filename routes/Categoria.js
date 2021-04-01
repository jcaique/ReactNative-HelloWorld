const express = require('express');
const rota = express.Router();
const Categoria = require('../model/Categoria');
const { check, validationResult } = require('express-validator');


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



/**
 * LISTA uma CATEGORIA pelo id
 * GET /categorias/:id
 */
//quando coloca ":" na rota, entende-se que vai receber um paramentro
rota.get('/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        res.json(categoria)
    } catch (e) {
        res.status(500).send({
            errors: [{ mensagem: `Não foi possivel obter a categoria com o id ${req.params.id} ` }]
        });

        console.error(e);
    }
});


/**
 * Inclui uma nova categoria
 * POST /categorias/
 */
const validaCategoria = [
    check("nome", "Nome da categoria é obrigaório").not().isEmpty(),
    check("status", "Informe um status valido para a categoria").isIn(["ativo", "inativo"])
]

rota.post('/', validaCategoria, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //verifica se a catgoria ja existe
    const { nome } = req.body;
    let categoria = await Categoria.findOne({ nome });
    if (categoria)
        return res.status(200).json({
            errors: [{ message: 'Já existe uma categoria com o nome informado!' }]
        });

    try {
        let categoria = new Categoria(req.body);
        await categoria.save();
        res.send(categoria);
    } catch (error) {
        return res.status(500).json({
            errors: [{ message: `Erro ao salvar categoria: ${error.message}` }]
        })
    }
})


/**
 * REMOVE uma nova categoria
 * DELETE /categorias/:id
 */
rota.delete('/:id', async (req, res) => {
    await Categoria.findByIdAndRemove(req.params.id).then(categoria => {
        res.send({ message: `Categoria ${categoria.nome} removida com sucesso!` })
    }).catch(err => {
        return res.status(500).send({
            errors: [{ message: `Não foi possivel apagar a categoria com o id ${req.params.id} ` }]
        })
    })
})


/**
 * Altera uma nova categoria
 * PUT /categorias/:id
 */
rota.put('/:id', validaCategoria, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let dados = req.body

    await Categoria.findByIdAndUpdate(req.body._id, {
        $set: dados
    }, { new: true }).then(categoria => {
        res.send({ message: ` Categoria ${categoria.nome} alterada com sucesso!` })
    }).catch(err => {
        return res.status(500).send({
            errors: [{ message: `Não foi possivel alterar a categoria com o id ${req.params._id}` }]
        })
    })
})

module.exports = rota;
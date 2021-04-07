const express = require('express');
const rota = express.Router();
const multer = require('multer');


//definindo a pasta padrão

const upload = multer({
    dest: './public/uploads'
})


//processo de upload de uma imagem - POST /
rota.post('/', upload.array('file'),
    async (req, res) => {
        console.log(`Arquivos recebidos ${req.files.length}`)
        const statusUpload = req.files.length > 0 ? true : false
        res.send({
            upload: statusUpload,
            files: req.files
        })
    })

module.exports = rota
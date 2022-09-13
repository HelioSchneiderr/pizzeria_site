const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pedidos")
const Pedido = mongoose.model("pedidos")




router.get("/faca-seu-pedido", (req, res)=>{
    res.render("header/faca-seu-pedido", {style: "style.css"})
})

router.get("/cardapio", (req, res)=>{
    res.render("header/cardapio", {style: "style.css"})
})

router.get("/unidades", (req, res)=>{
    res.render("header/unidades", {style: "style.css"})
})

router.post("/novo-pedido", (req, res)=>{
    
    const novoPedido ={
        tamanho: req.body.tamanho,
        sabor: req.body.sabor,
        bebidas: req.body.bebidas,
        endereco: req.body.endereco,
        telefone: req.body.telefone
    }

    new Pedido(novoPedido).save().then(()=>{
        console.log("salvo com sucessso")
    }).catch((err) =>{
        console.log("Erro ao salvar o pedido" + err)
    })

})

module.exports = router
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pedidos")
const Pedido = mongoose.model("pedidos")
require("../models/Pizza")
const Pizza = mongoose.model("pizza")




router.get("/faca-seu-pedido", (req, res)=>{
    res.render("header/faca-seu-pedido", {style: "style.css"})
})

router.get("/cardapio", (req, res)=>{
    Pizza.findAll().lean.then((pizza)=>{
        res.render("header/cardapio", {pizza: pizza})
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos")
        res.redirect("header/cardapio", {style: "style.css"})
    })

    
})

router.get("/unidades", (req, res)=>{
    res.render("header/unidades", {style: "style.css"})
})

router.post("/novo-pedido", (req, res)=>{

    let errors = [];

    if(!req.body.sabor || !req.body.bebidas || !req.body.endereco || !req.body.telefone){
        errors.push({text: "Um dos campos está vazio"})
    };

    if(req.body.descricao.length < 100){
        errors.push({text: "Descrição inválida, o campo está vazio ou possui poucas palavras"})
    };

    if(req.body.preco.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(errors.length > 0){
        res.render("admin/adicionar-cardapio", {errors:errors})
    }

    else{
    
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
    }

})

module.exports = router
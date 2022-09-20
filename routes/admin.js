const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pizza")
const Pizza = mongoose.model("pizza")

router.get("/adicionar-cardapio", (req,res)=>{
    res.render("admin/adicionar-cardapio", {style: "style.css"})
});

router.post("/nova-pizza", (req,res)=>{
    
    const novaPizza = {
        tipo: req.body.tamanho,
        sabor: req.body.sabor,
        descricao: req.body.descricao,
        preco: req.body.preco
    }

    new Pizza(novaPizza).save().then(()=>{
        console.log("Pizza Adicionada")
    }).catch((err)=>{
        console.log("Deu um erro" + err)
    })

})


module.exports = router
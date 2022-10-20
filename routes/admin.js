const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pizza")
const Pizza = mongoose.model("pizza")

router.get("/adicionar-cardapio", (req,res)=>{
    res.render("admin/adicionar-cardapio", {style: "style.css"})
});

router.post("/nova-pizza", (req,res)=>{
    
    let errors = [];

    if(!req.body.sabor){
        errors.push({text: "Sabor inválido, o campo está vazio"})
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

        const novaPizza = {
            tipo: req.body.tipo,
            sabor: req.body.sabor,
            descricao: req.body.descricao,
            preco: req.body.preco
        }

        new Pizza(novaPizza).save().then(()=>{
            req.flash("success_msg", "Produto Adicionado com successo")
            res.redirect("../header/cardapio")
        }).catch((err)=>{
            req.flash("error_msg", `O produto não foi adicionado devido ao erro: ${err}`)
            res.redirect("../header/cardapio")
        })
    }

})


module.exports = router
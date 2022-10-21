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

    if(req.body.descricao.length < 20){
        errors.push({text: "Descrição inválida, o campo está vazio ou possui poucas palavras"})
    };

    if(req.body.preco1.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(req.body.preco2.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(req.body.preco3.length <= 2){
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
            preco1: req.body.preco1,
            preco2: req.body.preco2,
            preco3: req.body.preco3
        }

        new Pizza(novaPizza).save().then(()=>{
            req.flash("success_msg", "Produto adicionado com successo")
            res.redirect("../header/cardapio")
        }).catch((err)=>{
            req.flash("error_msg", `O produto não foi adicionado devido ao erro: ${err}`)
            res.redirect("../header/cardapio")
        })
    }

})


module.exports = router
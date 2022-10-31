const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pizza")
const Pizza = mongoose.model("pizza")

router.get("/add_menu", (req,res)=>{
    res.render("admin/add_menu", {style: "style.css"})
});

router.post("/new_pizza", (req,res)=>{
    
    let errors = [];

    if(!req.body.flavor){
        errors.push({text: "Sabor inválido, o campo está vazio"})
    };

    if(req.body.description.length < 20){
        errors.push({text: "Descrição inválida, o campo está vazio ou possui poucas palavras"})
    };

    if(req.body.price_small.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(req.body.price_average.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(req.body.price_big.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(errors.length > 0){
        res.render("admin/add_menu", {errors:errors})
    }

    else{

        const newPizza = {
            type: req.body.type,
            flavor: req.body.flavor,
            description: req.body.description,
            price_small: req.body.price_small,
            price_average: req.body.price_average,
            price_big: req.body.price_big
        }

        new Pizza(newPizza).save().then(()=>{
            req.flash("success_msg", "Produto adicionado com successo")
            res.redirect("../header/pizzeria_menu")
        }).catch((err)=>{
            req.flash("error_msg", `O produto não foi adicionado devido ao erro: ${err}`)
            res.redirect("../header/pizzeria_menu")
        })
    }

})


module.exports = router
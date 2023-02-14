const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Request")
require("../models/Pizza")
require("../models/Several")
const Pizza = mongoose.model("pizza")
const Several = mongoose.model("several")
const Request = mongoose.model("request")





//Request for user
router.get("/place_order", (req, res)=>{
    Pizza.find().lean().then((pizza)=>{
        res.render("header/place_order", {pizza: pizza})
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos" + err)
        res.redirect("header/pizzeria_menu", {style: "style.css"})
    })   
})



router.get("/pizzeria_menu", (req, res)=>{
    Pizza.find({type: "salgada"}).lean().then((pizza)=>{
        res.render("header/pizzeria_menu", {pizza: pizza})
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos")
        res.redirect("header/pizzeria_menu", {style: "style.css"})
    })   
})



//filter for sweet pizza in menu
router.get("/sweet_pizza", (req, res)=>{


    Pizza.find({type: "doce"}).lean().then((pizza)=>{
         res.render("header/pizzeria_menu", {pizza: pizza})  
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos")
        res.redirect("header/pizzeria_menu", {style: "style.css"})
    })   
})


//filter for drinks in menu
router.get("/drink_menu", (req,res)=>{
    
    Several.find({type: "bebida"}).lean().then((several)=>{
        res.render("header/pizzeria_menu", {several: several})
    }).catch((err) =>{
        console.log(err)
        res.flash("error_message", "Houver um erro ao listar as bebidas")
        res.redirect("header/pizzaria_menu", {style: "style.css"})
    })
})


//filter for several in menu
router.get("/several_menu", (req,res)=>{
    
    Several.find({type: "diverso"}).lean().then((several)=>{
        res.render("header/pizzeria_menu", {several: several})
    }).catch((err) =>{
        console.log(err)
        res.flash("error_message", "Houver um erro ao listar as bebidas")
        res.redirect("header/pizzaria_menu", {style: "style.css"})
    })
})


router.get("/unit_places", (req, res)=>{
    res.render("header/unit_places", {style: "style.css"})
})




//Requests for the establishment to make
router.post("/new_request", (req, res)=>{


    let errors = [];

    if(!req.body.flavor1 || !req.body.drink || !req.body.address || !req.body.telephone){
        errors.push({text: "Um dos campos está vazio"})
    };

    if(errors.length > 0){
        res.render("header/place_order", {errors:errors})
    }

    else{
    
    const newRequest ={
        size: req.body.size,
        flavor1: req.body.flavor1,
        flavor2: req.body.flavor2,
        flavor3: req.body.flavor3,
        drink: req.body.drink,
        address: req.body.address,
        telephone: req.body.telephone,
        payment: req.body.payment,
        id: req.pizzaLength 
    }

    new Request(newRequest).save().then(()=>{
        req.flash("success_msg", "Pedido feito com sucesso")
        res.redirect("../header/pizzeria_menu")
    }).catch((err) =>{
        console.log("Erro ao salvar o pedido" + err)
    })
    }
    
})

module.exports = router
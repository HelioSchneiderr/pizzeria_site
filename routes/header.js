const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Request")
require("../models/Pizza")
require("../models/Several")
const Pizza = mongoose.model("pizza")
const Several = mongoose.model("several")
const Request = mongoose.model("request")




router.get("/place_order", (req, res)=>{
    res.render("header/place_order", {style: "style.css"})
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

    let pizzaLength = Pizza.length

    let errors = [];

    if(!req.body.flavor || !req.body.drink || !req.body.address || !req.body.telephone){
        errors.push({text: "Um dos campos está vazio"})
    };

    if(errors.length > 0){
        res.render("admin/add_menu", {errors:errors})
    }

    else{
    
    const newRequest ={
        size: req.body.size,
        flavor: req.body.flavor,
        drink: req.body.drink,
        address: req.body.address,
        telephone: req.body.telephone,
        payment: req.body.payment,
        id: req.pizzaLength 
    }

    new Request(newRequest).save().then(()=>{
        console.log("salvo com sucessso")
    }).catch((err) =>{
        console.log("Erro ao salvar o pedido" + err)
    })
    }

})

module.exports = router
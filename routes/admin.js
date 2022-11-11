const { request } = require("express")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Pizza")
require("../models/Several")
require("../models/Request")
const Pizza = mongoose.model("pizza")
const Several = mongoose.model("several")
const Request = mongoose.model("request")


console.log(request.length)

router.get("/admin_page", (req,res)=>{
    res.render("admin/admin_page", {style: "style.css"})
})

//Adding pizzas 

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


//Adding drinks and miscellaneous

router.get("/add_several", (req, res) =>{
    res.render("admin/add_menu_several", {style: "style.css"})
})


router.post("/new_several", (req,res)=>{
    
    let errors = [];

    if(!req.body.name){
        errors.push({text: "Sabor inválido, o campo está vazio"})
    };

    if(req.body.description.length < 2){
        errors.push({text: "Descrição inválida, o campo está vazio ou possui poucas palavras"})
    };

    if(req.body.price.length <= 2){
        errors.push({text: "Preço inválido"})
    };

    if(errors.length > 0){
        res.render("admin/add_menu", {errors:errors})
    }

    else{

        const newSeveral = {
            type: req.body.type,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }

        new Several(newSeveral).save().then(()=>{
            req.flash("success_msg", "Produto adicionado com successo")
            res.redirect("../header/pizzeria_menu")
        }).catch((err)=>{
            req.flash("error_msg", `O produto não foi adicionado devido ao erro: ${err}`)
            res.redirect("../header/pizzeria_menu")
        })
    }

})


//Delete Menu

router.get("/delete_menu", (req,res)=>{
    res.render("admin/delete_menu")
})

router.get("/drink_menu", (req,res)=>{
    
    Several.find({type: "bebida"}).lean().then((several)=>{
        res.render("admin/delete_menu", {several: several})
    }).catch((err) =>{
        console.log(err)
        res.flash("error_message", "Houver um erro ao listar as bebidas")
        res.redirect("admin/delete_menu", {style: "style.css"})
    })
})


//filter for several in menu
router.get("/several_menu", (req,res)=>{
    
    Several.find({type: "diverso"}).lean().then((several)=>{
        res.render("admin/delete_menu", {several: several})
    }).catch((err) =>{
        console.log(err)
        res.flash("error_message", "Houver um erro ao listar as bebidas")
        res.redirect("admin/delete_menu", {style: "style.css"})
    })
})

router.get("/pizzeria_menu", (req, res)=>{
    Pizza.find({type: "salgada"}).lean().then((pizza)=>{
        res.render("admin/delete_menu", {pizza: pizza})
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos")
        res.redirect("admin/delete_menu", {style: "style.css"})
    })   
})



//filter for sweet pizza in menu
router.get("/sweet_pizza", (req, res)=>{


    Pizza.find({type: "doce"}).lean().then((pizza)=>{
         res.render("admin/delete_menu", {pizza: pizza})  
    }).catch((err)=>{
        res.flash("error_message", "Houve um erro ao listar os produtos")
        res.redirect("admin/delete_menu", {style: "style.css"})
    })   
})



//Requests

router.get("/request", (req, res)=>{

    Request.find().sort({data: "desc"}).lean().then((request)=>{
        res.render("admin/request", {request:request})
    }).catch((err)=>{
        req.flash("error_msg", "Erro ao listar os pedidos")
        res.redirect("index")
    })
})

//Request remove

router.get("/request/remove/:id", (req, res)=>{
    Request.remove({_id: req.params.id}).then(()=>{
        res.redirect("/admin/request")
    })
})

//Pizza remove

router.get("/menu/remove/:id", (req, res)=>{
    Pizza.remove({_id: req.params.id}).then(()=>{
        res.redirect("/header/pizzeria_menu")
    })
})

router.get("/several/remove/:id", (req, res)=>{
    Several.remove({_id: req.params.id}).then(()=>{
        res.redirect("/header/pizzeria_menu")
    })
})





module.exports = router
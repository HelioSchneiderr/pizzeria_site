const express = require("express")
const router = express.Router()




router.get("/faca-seu-pedido", (req, res)=>{
    res.render("header/faca-seu-pedido", {style: "style.css"})
})

router.get("/cardapio", (req, res)=>{
    res.render("header/cardapio", {style: "style.css"})
})

router.get("/unidades", (req, res)=>{
    res.render("header/unidades", {style: "style.css"})
})

module.exports = router
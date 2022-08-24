const express = require("express")
const router = express.Router()




router.get("/faca-seu-pedido", (req, res)=>{
    res.render("header/faca-seu-pedido", {style: "style.css"})
})

module.exports = router
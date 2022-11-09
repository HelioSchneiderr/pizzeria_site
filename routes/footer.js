const express = require("express")
const router = express.Router()

router.get("/terms", (req, res)=>{
    res.render("footer/terms")
})

router.get("/work", (req, res)=>{
    res.render("footer/work_with_us")
})

router.get("/about", (req, res)=>{
    res.render("footer/about_us")
})

module.exports = router
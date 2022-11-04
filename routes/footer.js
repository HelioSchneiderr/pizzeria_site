const express = require("express")
const router = express.Router()

router.get("/terms", (req, res)=>{
    res.render("footer/terms")
})


module.exports = router
const express = require("express");
const app = express();
const handlebars = require("express-handlebars")



//Configs

    //Handlebars
         const handle = handlebars.create({
            defaultLayout: 'main'
            });
        
            app.engine('handlebars', handle.engine);
            app.set('view engine', 'handlebars');
            app.use(express.static("public"))


//Rotas
    app.get("/", (req, res)=>{
        res.render("index", {style: "style.css", script: "index.js"})
    })

const PORT = 65
app.listen(PORT, ()=>{
    console.log("Server Open")
})
    
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const header = require("./routes/header")
const admin = require("./routes/admin")
const mongoose = require("mongoose")



//Configs

    //Body Parser
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());


    //Handlebars
         const handle = handlebars.create({
            defaultLayout: 'main'
            });
        
            app.engine('handlebars', handle.engine);
            app.set('view engine', 'handlebars');
            app.use(express.static(__dirname + "/public"))

    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/pizza").then(() =>{
        console.log("Conectado ao mongo")
    }).catch((err) => {
        console.log("Erro ao se conectar: " +err)
    })


//Rotas
    app.get("/", (req, res)=>{
        res.render("index", {style: "style.css", script: "index.js"})
    })

    

    app.use("/admin", admin)
    app.use("/header", header)

const PORT = 2800
app.listen(PORT, ()=>{
    console.log("Server Open")
})
    
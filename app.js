const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars")
const header = require("./routes/header")
const admin = require("./routes/admin")
const footer = require("./routes/footer")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")



//Configs


    //Session
    app.use(session({
        secret: "27819205",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

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
    mongoose.connect("mongodb://127.0.0.1:27017/pizzaria").then(() =>{
        console.log("Conectado ao mongo")
    }).catch((err) => {
        console.log("Erro ao se conectar: " +err)
    })

    //Public
    app.use(express.static(path.join(__dirname,"public")))
    app.use((req, res, next) =>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next();
    })


//Rotas
    app.get("/", (req, res)=>{
        res.render("index", {style: "style.css", script: "index.js"})
    })

    
    app.use("/footer", footer)
    app.use("/admin", admin)
    app.use("/header", header)

const PORT = 9676
app.listen(PORT, ()=>{
    console.log("Server Open")
})
    
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pizza = new Schema({
    tipo:{
        type: String,
        require: true
    },
    sabor:{
        type: String,
        require: true
    },
    descricao:{
        type: String,
        require: true,
    },
    preco:{
        type: String,
        require: true,
    }

})

mongoose.model("pizza", Pizza)
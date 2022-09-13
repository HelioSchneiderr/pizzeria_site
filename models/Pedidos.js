const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pedido = new Schema({
    tamanho:{
        type: String,
        require: true
    },
    sabor:{
        type: String,
        require: true
    },
    bebidas:{
        type: String,
        require: true
    },
    endereco:{
        type: String,
        require: true
    },
    telefone:{
        type: Number,
        require: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("pedidos", Pedido)
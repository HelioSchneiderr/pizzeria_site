const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Request = new Schema({


    size:{
        type: String,
        require: true
    },
    flavor:{
        type: String,
        require: true
    },
    drink:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    telephone:{
        type: Number,
        require: true
    },

    payment:{
        type: String,
        require: true
    },

    date:{
        type: Date,
        default: Date.now()
    },
    id:{
        type: String,
        require: true
    }
})

mongoose.model("request", Request)
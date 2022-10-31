const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pizza = new Schema({
    type:{
        type: String,
        require: true
    },
    flavor:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true,
    },
    price_small:{
        type: String,
        require: true,
    },
    price_average:{
        type: String,
        require: true,
    },
    price_big:{
        type: String,
        require: true,
    }

})

mongoose.model("pizza", Pizza)
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Several = new Schema({
    type:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    }
})

mongoose.model("several", Several)
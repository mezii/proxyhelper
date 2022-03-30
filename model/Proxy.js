const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Proxy = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    },
    host: {
      type: String
        },
    port: {
      type: Number
    },
    numberOfConnection:{    
      type: Number,
      default: 0
    },
    type:{
      type: String,
      default: "none"
    },
    fowardPort:{
      type: Number,
      default: 0
    }
}
);

module.exports = mongoose.model("Proxy", Proxy);
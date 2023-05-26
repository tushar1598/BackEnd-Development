
const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/codeial_pass');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error in database"));

db.once('open',function(){
    console.log('connecting to the database');
})


module.exports = db;
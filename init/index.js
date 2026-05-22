const mongoose = require('mongoose');
const initData = require('./data.js');
const Note = require('../models/notemodel.js');
main().then(()=>{
    console.log("Connected to db successfully");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/notesphere");
};
const initDb = async()=>{
     await Note.deleteMany({});
    await Note.insertMany(initData.data);
    console.log("Sample Data inserted successfully");
};
initDb();
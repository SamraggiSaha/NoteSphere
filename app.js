const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/notemodel.js');
const engine = require("ejs-mate");
app.engine("ejs", engine);
app.set("view engine", "ejs");


main().then(()=>{
    console.log("Connected to db successfully");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/notesphere");
};
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("Hello its working");
});

// Index(Home page)route 
app.get("/notes", async(req,res)=>{
    const allNotes = await Note.find({});
    res.render("index.ejs",{allNotes});
});

//Add note
app.get("/notes/add",(req,res)=>{
    res.render("add.ejs");
});

//Create note 
app.post("/notes", async(req,res)=>{
    const {title,content} = req.body;
    const newNote = new Note({title,content});
    await newNote.save();
    res.redirect("/notes");
});
 
//edit note
app.get("/notes/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const note = await Note.findById(id);
    res.render("edit.ejs",{note});
});
//update note 
app.put("/notes/:id", async(req,res)=>{
    let {id} = req.params;
    let note = await Note.findByIdAndUpdate(id,{...req.body.note});
    await note.save();
    res.redirect("/notes");
});


//delete note 
app.delete("/notes/:id", async(req,res)=>{
    let {id} = req.params;
    await Note.findByIdAndDelete(id);
    res.redirect("/notes");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
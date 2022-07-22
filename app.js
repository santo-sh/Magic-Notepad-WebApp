const express = require('express');
const mongoose = require('mongoose');
// const speech = require('./models/speech');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/magicNotes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
    note: String,
});
const Note = mongoose.model("Note", noteSchema);
const defaultNote = new Note({
    note: "Go to School",
});
app.get('/', async(req, res) => {
    try{
        const result = await Note.find();
        return res.render('main', { result });
    }catch(e){
        return res.status(200).send({message: e.message || 'Something went wrong!'});
    }
});

app.post('/', (req, res) => {
    const input = req.body.textbox;
    if (!(input == null || input == "")) {
        console.log(input);
        const newNote = new Note({
            note: input,
        });
        newNote.save();
    }
    res.redirect("/");
});

app.post('/delete', async(req, res) => {
    console.log(req.body);
    try{
        const response = await Note.findByIdAndDelete(req.body.submit);
        console.log(response);
        if(!response){
            return res.status(200).send({message: 'Nothing to delete'});
        }
        console.log("Deleted Successfully!");
        return res.status(200).redirect('/');
    }catch(e){
        console.log(e);
        return res.status(200).send({message: e.message});
    }
});


app.get('/:customLocation', (req, res) => {
    console.log(req.params.customLocation);
    res.redirect('/');
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () => {
    console.log(`Port is listening at ${port}`);
});
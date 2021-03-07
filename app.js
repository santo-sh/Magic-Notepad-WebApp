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

const noteSchema = {
    note: String,
}
const Note = mongoose.model("Note", noteSchema);
const defaultNote = new Note({
    note: "Go to School",
});
app.get('/', (req, res) => {
    Note.find({}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.render('main', { result: result });
        }
    })
});

app.get('/:customLocation', (req, res) => {
    console.log(customLocation);
    res.redirect('/');
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

app.post('/delete', (req, res) => {
    console.log(req.body);
    Note.findByIdAndDelete(req.body.submit, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Successfully!!");
            res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () => {
    console.log("Port is listening at port");
});
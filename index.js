import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let vlogs = [];
let title = [];

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render("index.ejs", {vlogs: vlogs});
});

app.get('/vlog/:id', (req, res) => {
    const vlogId = req.params.id;
    const vlog = vlogs[vlogId]; 
    const vlogDes = title[vlogId];
    
    res.render('vlogs.ejs', {
        vlog: vlog,
        vlogDes: vlogDes,
        vlogId: vlogId
    });
});

app.post('/update/:id', (req,res) => {
    const vlogId = req.params.id;
    const vlog = vlogs[vlogId]; 
    const vlogDes = title[vlogId];

    res.render('update.ejs', {
        vlog: vlog,
        vlogDes: vlogDes,
        vlogId: vlogId
    });
})

app.post('/submit', (req,res) => {
    vlogs.push(req.body["vlogName"]);
    title.push(req.body["title"]);
    res.redirect('/');
});


app.post('/remove', (req,res) => {
    vlogs.splice(req.body.index,1)
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server running at ${port}.`);
});
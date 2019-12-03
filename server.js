const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let date = new Date();
let dd = date.getDate();
let mm = date.getMonth()+1;
let yyyy = date.getFullYear();
let currentDate = mm + '/' + dd + '/' + yyyy 


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set(bodyParser.json());


let db
MongoClient.connect('mongodb://starboardaliMDB:aurora4603@ds251618.mlab.com:51618/heroku_6056z36q', {    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err)
    db = database.db('issues')
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.post('/issues', (req, res) => {
    db.collection('issues').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Issue saved to database')
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    db.collection('issues').find().toArray(function (err, results) {
        if (err) return console.log(err);
        res.render('index.ejs', {
            issues: results

        });
    })
});

app.put('/issues', (req, res) => {
    db.collection('issues').findOneAndUpdate( { status: 'resolved' },
    {
        $set: {
            status: req.body.status,
            updated: currentDate

        }
    },
        {
            sort: {_id: -1 }, 
            upsert:  true 

        }, (err, results) => {
            if (err) return res.send(err)
            res.send(results);
            console.log('New issue updated')
    });
});

app.delete('/issues', (req, res) => {
    db.collection('issues').findOneAndDelete({
            status: req.body.status
        },
        (err, results) => {
            if (err) return res.send(500, err)
            res.redirect('/')
            console.log('Closed issue deleted.')
        });
});




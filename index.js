var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var booksController = require('./controllers/booksController');

var app = express();

// CORS: Cross Origin Resource Sharing
app.use(cors()); //cors function looks something like this: 
/*
function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "*")
}
*/
// the above response allows:
// origins from anywhere (* === anywhere)
// methods from anywhere

app.use(bodyParser.json());

// 3.1
app.get('/books', booksController.index);
// 3.2
app.post('/books', booksController.build)
// 3.3
app.put('/books', booksController.update)
// 3.4
app.delete('/books/:num', booksController.destroy)

var port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
})


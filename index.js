var express = require('express');
var bodyParser = require('body-parser')
var booksController = require('./controllers/booksController');

var app = express();

// parse body as json
// assigns result to req.body
app.use(bodyParser.json());

app.get('/books', booksController.index);
app.post('/books', booksController.build)
app.put('/books', booksController.update)
app.delete('/books/:num', booksController.destroy)

var port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
})

// QUERY PARAMS
// https://site.com/books?author=JK_Rowling&year=2000
// query is 'author=JK_Rowling&year=2000'
// express will take everything after question mark
// and puts it in req.query object

/*
req.query = {
    rating: 8
}
*/

// search for books with rating of 10
// https://site.com/books?rating=10
// 

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


// STATUS CODES
// 200 === OK
// 204 === No content
    // might see this as a response to a delete request
// The 400's are generally used to say the client sent something wrong
    // 404 === Not found
    // 401 / 402 === Not signed in / not authorized
// 500 === internal server error


var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// parse body as json
// assigns result to req.body
app.use(bodyParser.json());

var books = ['Count of Monte Cristo', 'The Bible', 'Moby Dick'];

// if path === '/books', run cb function
// must be GET method
app.get('/books', function(req, res, next) {
    // req === request, which is nothing in a GET request
    // res === response
    console.log('Received GET request')
    res.send(books);
})

// POST adds info
app.post('/books', function(req, res, next) {
    // req.body (request body) === {"name": <book name>}
    console.log('Received POST: ' + req.body.name)
    books.push(req.body.name);
    res.send(books);
})

// PUT changes info
app.put('/books', function(req, res, next) {
    // req.body === {
    //      position: <num>,
    //      newName
    // }
    console.log('Received PUT: ' + req.body.newName + ' at position ' + req.body.position)
    books[req.body.position] = req.body.newName;
    res.send(books);
})

// using req.params, you can get info passed in by url
// :num will be whatever client navigates to
// if path is books/2, req.params === {
//      num: 2
// }
app.delete('/books/:num', function(req, res, next) {
    books.splice(req.params.num, 1)
    console.log('Received DELETE position: ' + req.params.num)
    res.send(books);
})

var port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
})

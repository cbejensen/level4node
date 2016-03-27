var express = require('express');
var bodyParser = require('body-parser')
var booksController = require('./controllers/booksController');

var app = express();

// 1 - this function is called first
// it has a next() function at the end
// this allows the next function to be called
app.use(bodyParser.json());

// 2 - because the first function calls next()
// this function will execute
app.use(function(req, res, next) {
    /*
    if(req.body.something === 4) {
        console.log('It was 4!')
        next(); //this skips to the next function
    }
    */
    // code below this will not run if req.body.something === 4
    next()
})

// 3 - this function will only run if
// previous function calls next()
app.use(function(req, res, next) {
    console.log('Previous function called next!');
    next();
})

// let's try this another way
// by declaring the functions first
var func1 = function(req, res, next) {
    console.log('func1');
    next();
}

var func2 = function(req, res, next) {
    console.log('func2');
    next();
}

// 4 - we can plug in our functions like this:
app.use(func1, func2);
// but you still need to call next() to move to next function


// now let's try authentication with next()
// delete request must pass in query with admin=true
var isAdmin = function(req, res, next) {
    if (req.query.admin === 'true') {
        next(); // only move to next function if admin
    } else {
        res.status(401).send("Access denied - only admins are allowed!")
    }
}
//note app.delete func below

// 3.1
app.get('/books', booksController.index);
// 3.2
app.post('/books', booksController.build)
// 3.3
app.put('/books', booksController.update)
// 3.4
app.delete('/books/:num', isAdmin, booksController.destroy)

var port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
})


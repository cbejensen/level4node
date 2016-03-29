var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var usersController = require('./controllers/usersController');

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


// this calls the session function above and passes it an object
app.use(session({
    secret: 'gwluis78s-sgjlsi34934-sdjlfsdifi543llas',
    saveUninitialized: false,
    resave: false
}));
// the secret can be anything


// we are going to create a function to log header, body and session
var logger = function(req, res, next) {
    console.log('\n\n--------------------\n----------------\n\n')
    console.log('\n____HEADERS___\n', req.headers)
    console.log('\n____BODY___\n', req.body)
    console.log('\n____SESSION___\n', req.session)
    next();
}

app.use(bodyParser.json());

app.use(logger)

app.get('/users/:id', usersController.getUser);
app.get('/users', usersController.getUsers)
app.post('/users', usersController.build)
app.put('/users/:id', usersController.update)
app.delete('/users/:id', usersController.destroy)

app.post('/cart', function(req, res, next) {
    if(!req.session.cart) req.session.cart = [];
    req.session.cart.push(req.body);
    res.status(200).json(req.session.cart);
})

var port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
})


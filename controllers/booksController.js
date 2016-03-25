var books = require('../models/books');

module.exports = {
    index: function(req, res, next) {
        // query.rating is string, so we have to make it a number
        var rating = parseInt(req.query.rating, 10);
        console.log('Received GET request for books with a rating of ' + rating)
        var matches = [];
        books.forEach(function(e, i, a) {
            if(e.rating === rating) {
                matches.push(e);
            }
        })
        res.send(matches);
    },
    build: function(req, res, next) {
        // req.body (request body) === {"name": <book name>}
        console.log('Received POST: ' + req.body.name)
        books.push(req.body.name);
        res.send(books);
    },
    update: function(req, res, next) {
        // req.body === {
        //      position: <num>,
        //      newName
        // }
        console.log('Received PUT: ' + req.body.newName + ' at position ' + req.body.position)
        books[req.body.position] = req.body.newName;
        res.send(books);
    },
    destroy: function(req, res, next) {
        books.splice(req.params.num, 1)
        console.log('Received DELETE position: ' + req.params.num)
        res.send(books);
    }
};
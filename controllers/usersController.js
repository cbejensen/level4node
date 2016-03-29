var users = require('../models/users');

var userCount = 3;

module.exports = {
    getUsers: function(req, res, next) {
        console.log('Received GET request for all users')
        res.send(users);
    },
    getUser: function(req, res, next) {
        var id = parseInt(req.params.id, 10);
        console.log('Received GET request for user ' + id)
        users.forEach(function(e, i, a) {
            if(e.id === id) {
                res.send(e);
            }
        })
    },
    build: function(req, res, next) {
        console.log('Received POST request to add ' + req.body.name)
        var user = req.body;
        user.id = userCount + 1;
        userCount++;
        users.push(user);
        res.send(users);
    },
    update: function(req, res, next) {
        console.log('Received PUT request to update user ' + req.params.id +
                   ' with name of ' + req.body.name)
        users[req.params.id - 1].name = req.body.name;
        res.send(users);
    },
    destroy: function(req, res, next) {
        console.log('Received DELETE request for user ' + req.params.id)
        users.splice(req.params.id - 1, 1);
        var newId = 1;
        users.forEach(function(e, i, a) {
            e.id = newId;
            newId++;
        })
        res.send(users);
    }
};
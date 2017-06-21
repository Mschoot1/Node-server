var express = require('express');
var routes = express.Router();
var bcrypt = require('bcryptjs');
var db = require('../config/db');
var salt = bcrypt.genSaltSync(10);

routes.get('/register/:id', function(request, response) {
    db.query('SELECT register_history.order_id, register_history.customer_id, register_history.timestamp, orders.price_total from register_history INNER JOIN orders ON orders.id = register_history.order_id WHERE register_history.register_id=? ORDER BY register_history.timestamp DESC', [request.params.id], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

module.exports = routes;
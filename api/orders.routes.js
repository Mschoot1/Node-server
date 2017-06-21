var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/orders/:user', function(request, response) {
    db.query('SELECT * FROM orders WHERE customer_id=? AND `status` =1 ORDER BY timestamp DESC', [request.params.user], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

routes.get('/order/:id', function(request, response) {
    db.query('SELECT * FROM orders WHERE id=?', [request.params.id], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

routes.get('/order/current/:user', function(request, response) {
    db.query('SELECT * FROM orders WHERE status=0 AND customer_id=?', [request.params.user], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

routes.put('/order/price/edit', function(request, response) {
    db.query('UPDATE `orders` SET `price_total`=? WHERE `id`=?', [request.body.price_total, request.body.order_id], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

routes.put('/order/pending', function(request, response) {
    db.query('UPDATE `orders` SET `pending`=? WHERE `id`=?', [request.body.pending, request.body.order_id], function(err, results, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.end(JSON.stringify({"results": results}));
    });
});

module.exports = routes;

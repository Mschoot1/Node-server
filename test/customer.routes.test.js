process.env.APP_EMAIL = 'test';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

var customer_id = process.env.CUSTOMER_ID;

chai.use(chaiHttp);

describe('customer routes', function () {
    this.timeout(10000);
    before(function (done) {
        var user = {
            email: process.env.APP_EMAIL,
            password: process.env.APP_PASSWORD
        };
        chai.request(server)
            .post('/loginAuth')
            .send(user)
            .end(function (err, res) {
                res.body.should.be.an('string');
                token = res.body;
                done();
            });
    });

    it('returns an object on GET /account/:user', function (done) {
        chai.request(server)
            .get('/account/:user')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('returns an object on GET /email/:user', function (done) {
        chai.request(server)
            .get('/email/:user')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('returns an object on PUT /customer/device', function (done) {
        chai.request(server)
            .put('/customer/device')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('returns an object on GET /customer/:user/device/', function (done) {
        chai.request(server)
            .get('/customer/:user/device/')
            .set('Authorization', 'Bearer ' + token)
            .end(function (request, response) {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            });
    });
});


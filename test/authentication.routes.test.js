process.env.APP_EMAIL = 'test';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('authentication routes', function () {
    this.timeout(10000);
    it('returns an error on POST /loginAuth with invalid credentials ', function (done) {
        var credentials = {
            email: "",
            password: ""
        };
        chai.request(server)
            .post('/loginAuth')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });

    it('returns an error on POST /loginAuth with invalid credentials ', function (done) {
        var credentials = {
            email: "",
            password: ""
        };
        chai.request(server)
            .post('/loginAuth')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });

    it('returns a token on POST /loginRegister with valid credentials', function (done) {
        var credentials = {
            email: 284,
            password: 'demodemo'
        };
        console.log(credentials);
        chai.request(server)
            .post('/loginRegister')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.an('string');
                done();
            });
    });

    it('returns an error on POST /loginRegister with invalid credentials ', function (done) {
        var credentials = {
            email: "",
            password: ""
        };
        chai.request(server)
            .post('/loginRegister')
            .send(credentials)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
});
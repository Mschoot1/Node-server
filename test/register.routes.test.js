process.env.APP_EMAIL = 'test';
process.env.APP_PASSWORD = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

var customer_id = process.env.CUSTOMER_ID;

chai.use(chaiHttp);

describe('register routes', function () {
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

    it('returns an object on GET /register/:id', function (done) {
        chai.request(server)
            .get('/register/:id')
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});


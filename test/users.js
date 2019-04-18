let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const SERVER_URL = 'http://myapp:8000';

chai.use(chaiHttp);

const TEST_USER = {
    firstname: 'John',
    lastname: 'Doe'
}

let createdUserId;

describe('Users', () => {
    it('it should GET all the users and be empty', (done) => {
        chai.request(SERVER_URL)
            .get('/api/users')
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                }
            });
        });

    it('it should POST to create a new user', (done) => {
        chai.request(SERVER_URL)
            .post('/api/users')
            .send(TEST_USER)
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('firstname');
                    res.body.should.have.property('lastname');
                    res.body.id.should.not.be.null;
                    res.body.firstname.should.equal(TEST_USER.firstname);
                    res.body.lastname.should.equal(TEST_USER.lastname);
                    createdUserId = res.body.id;
                    done();
                }
            });
        });

    it('it should GET all the users and see the created user', (done) => {
        chai.request(SERVER_URL)
            .get('/api/users')
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                    const user = res.body[0];
                    user.id.should.equal(createdUserId);
                    user.firstname.should.equal(TEST_USER.firstname);
                    user.lastname.should.equal(TEST_USER.lastname);
                    done();
                }
            });
        });
});
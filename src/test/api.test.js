const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../index');

chai.use(chaiHttp);

let token;

describe('API routes', () => {
    const signup = '/api/signup';
    const signin = '/api/signin';
    const giphesList = '/api/giphies/';
    const fakePass = faker.internet.password();
    const fakeUser = { mastername: 'FakeUser', email: faker.internet.email(), password: fakePass, confirm_password: fakePass };

    before(done => {
        console.log('    Registering a test API user'.yellow);
        chai
            .request(server)
            .post(signup)
            .send(fakeUser)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('token');
                this.token = res.body.token;
                console.log('Token saved: '.blue + (this.token).cyan);
                done();
            });
    });

    // after('Dropping API database', done => {
    //     mongoose.connection.dropDatabase(() => {
    //         console.log('API database dropped OK'.yellow);
    //     });
    //     mongoose.connection.close(() => {
    //         console.log('Closing database connection'.red);
    //         done();
    //     });
    // });

    describe('API user get auth token and data', () => {
        it('missing email in signin should return 403', done => {
            const missingData = {}
            missingData.password = '1234';
            chai
                .request(server)
                .post(signin)
                .send(missingData)
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(false);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Email is needed');
                    done();
                });
        });

        it('missing password in signin should return 403', done => {
            const missingData = {}
            missingData.email = 'xxx@zzz.com';
            chai
                .request(server)
                .post(signin)
                .send(missingData)
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(false);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Password is needed');
                    done();
                });
        });

        it('wrong email in signin should return 403', done => {
            const wrongEmail = Object.assign({}, fakeUser);
            wrongEmail.email = 'xxx@zzz.com';
            chai
                .request(server)
                .post(signin)
                .send(wrongEmail)
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(false);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Email is not exists on database');
                    done();
                });
        });

        it('wrong password in signin should return 403', done => {
            const wrongPass = Object.assign({}, fakeUser);
            wrongPass.password = 'fakepass';
            chai
                .request(server)
                .post(signin)
                .send(wrongPass)
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(false);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Password is wrong');
                    done();
                });
        });

        it('signin with correct data should return 200 and auth token', done => {
            chai
                .request(server)
                .post(signin)
                .send(fakeUser)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(true);
                    expect(res.body).to.have.property('user');
                    expect(res.body).to.have.property('token');
                    this.token = res.body.token;
                    console.log('Token saved: '.blue + (this.token).cyan);
                    done();
                });
        });

        it('get giphies without token should return 403', done => {
            chai
                .request(server)
                .get(giphesList)
                .end((err, res) => {
                    expect(res.status, 403);
                    expect(res).to.be.json;
                    expect(res.body.success).to.equal(false);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Authorization token is not found');
                    done();
                });
        });

        it('get giphies with wrong token should return 403', done => {
            chai
                .request(server)
                .get(giphesList + '?token=faketoken')
                .end((err, res) => {
                    expect(res.status).to.equal(403);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Authorization token fail');
                    done();
                });
        });

        it('get giphies with correct token should return 200', done => {
            chai
                .request(server)
                .get(giphesList + '?token=' + this.token)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res).to.be.json;
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(true);
                    expect(res.body).to.have.property('giphies');
                    done();
                });
        });
    });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../index');

chai.use(chaiHttp);

// let token;

describe('Frontend routes', () => {
    const signup = '/signup';
    const signin = '/signin';
    const giphesList = '/giphies/';
    const fakeUser = { mastername: 'FakeUser', email: faker.internet.email(), password: faker.internet.password() };
    const user = { mastername: 'TestUser', email: 'user@giphyjs.com', password: faker.internet.password() };
    const admin = { mastername: 'TestAdmin', email: 'admin@giphyjs.com', password: 'admin' };

    before(done => {
        console.log('getting token');
        chai
            .request(server)
            .post(signup)
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                console.log(res.body);
                token = res.body.token;
                console.log('Token saved', token);
                done();
            });
    });

    after('Dropping test database', done => {
        mongoose.connection.dropDatabase(() => {
            console.log('Test database dropped OK');
        });
        mongoose.connection.close(() => {
            done();
        });
    });

    /*describe('User signup', () => {
        it('should return 200', done => {
            chai
                .request(server)
                .get(home)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('User signin', () => {
        it('should return 200', done => {
            chai
                .request(server)
                .get(about)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });*/
});
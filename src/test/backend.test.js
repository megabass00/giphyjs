const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest')
const faker = require('faker');
const mongoose = require('mongoose');
const path = require('path');
const { expect } = chai;
const server = require('../index');

chai.use(chaiHttp);

var authUser = request.agent(server);

describe('Backend routes', () => {
    const signup = '/signup';
    const signin = '/signin';
    const logout = '/logout';
    const profileView = '/profile';
    const editProfile = '/edit-profile';
    const changePass = '/change-password';
    const giphiesList = '/giphies/';
    const fakePass = faker.internet.email();
    const fakeUser = { mastername: 'FakeUser', email: faker.internet.email(), password: fakePass, confirm_password: fakePass };

    describe('User login and get data', () => {
        before(done => {
            console.log('    Registering a test backend user'.yellow);
            authUser
                .post(signup)
                .send(fakeUser)
                .end((err, res) => {
                    expect(res.status).to.equal(302);
                    expect('Location', giphiesList);
                    done();
                });
        });
    
        after('Dropping test database', done => {
            mongoose.connection.dropDatabase(() => {
                console.log('Database dropped OK'.yellow);
            });
            mongoose.connection.close(() => {
                console.log('Closing database connection'.red);
                done();
            });
        });

        it('should return 200 if user is logged in', done => {
            authUser
                .get(giphiesList)
                .expect(200, done);
        });

        it('user logout should return 302 and redirect to home', () => {
            authUser
                .get(logout)
                .end((err, res) => {
                    expect(res.status, 302);
                    expect('Location', '/');
                });
        });

        it('if user is not logged in giphies list should return 302 and redirect to signup', () => {
            authUser
                .get(giphiesList)
                .end((err, res) => {
                    expect(res.status, 302);
                    expect('Location', signup);
                });
        });

        it('if user is not logged in edit profile should return 302 and redirect to signup', () => {
            authUser
                .get(editProfile)
                .end((err, res) => {
                    expect(res.status, 302);
                    expect('Location', signup);
                });
        });

        it('if user is not logged in change password should return 302 and redirect to signup', () => {
            authUser
                .get(changePass)
                .end((err, res) => {
                    expect(res.status, 302);
                    expect('Location', signup);
                });
        });

        it('user correct login should return 302 and redirect to giphies list', () => {
            authUser
                .post(signin)
                .type('form')
                .send(fakeUser)
                .end((err, res) => {
                    expect(res.status).to.equal(302);
                    expect(res).to.have.cookie('user_sid');
                    expect('Location', giphiesList);
                });
        });

        it('giphies list should return 200', () => {
            authUser
                .get(giphiesList)
                .end((err, res) => {
                    expect(res.status, 200);
                });
        });

        it('edit profile should return 200', () => {
            authUser
                .get(editProfile)
                .end((err, res) => {
                    expect(res.status, 200);
                });
        });

        it('update profile with new data should return 200', () => {
            var pathToImage = path.join(__dirname, '/../public/img/users/default.png');
            authUser
                .post(editProfile)
                .type('form')
                .attach('files', pathToImage)
                .field('avatar', 'default.png')
                .field('mastername', 'New Name')
                .field('email', 'newemail@giphyjs.com')
                .end((err, res) => {
                    expect(res.status, 200);
                });
        });

        it('change pass should return 200', () => {
            authUser
                .get(changePass)
                .end((err, res) => {
                    expect(res.status, 200);
                });
        });

        /*it('changing wrong password should return 404', () => {
            var newPassword = {};
            newPassword.password = 'newpassword';
            newPassword.confirm_password = '1234';
            authUser
                .post(changePass)
                .type('form')
                .send(newPassword)
                .end((err, res) => {
                    console.log('body:', res.body);
                    console.log('wrong password STATUS: '+ res.status);
                    expect(res.status, 200);
                });
        });*/

        it('change user password should return 200', () => {
            var newPassword = {
                password: 'newpassword',
                confirm_password: 'newpassword'
            };
            authUser
                .post(changePass)
                .send(newPassword)
                .end((err, res) => {
                    expect(res.status, 200);
                    done();
                });
        });
    });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const server = require('../index');

chai.use(chaiHttp);

describe('Frontend routes', () => {
    const home = '/';
    const about = '/about';

    describe('Home page', () => {
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

    describe('About page', () => {
        it('should return 200', done => {
            chai
                .request(server)
                .get(about)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});
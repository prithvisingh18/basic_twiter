let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


// describe('/POST register', () => {
//     it('it should register user', (done) => {
//         let data = {
//             username: "test_1",
//             password: "pass"
//         }
//         chai.request(server)
//             .post('/register')
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('err');
//                 done();
//             });
//     });

// });

describe('login', () => {
    it('it should login', (done) => {
        var agent = chai.request.agent(server)
        agent
            .post('/login')
            .send({ username: 'test', password: 'test' })
            .then(function (res) {
                expect(res).to.have.status(200);
                done();
                // The `agent` now has the sessionid cookie saved, and will send it
                // back to the server in the next request:
                describe('GET Tweets', () => {
                    it('it should get tweets', (done) => {
                        agent.get('/tweet/get')
                            .then(function (res) {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
                });
                describe('CREATE Tweets', () => {
                    it('it should create tweets', (done) => {
                        agent.post('/tweet/create')
                            .send({ tweet: 'test_1234' })
                            .then(function (res) {
                                expect(res).to.have.status(200);
                                done();
                            });
                    });
                });
                describe('DELETE Tweets', () => {
                    it('it should delete tweets', (done) => {
                        agent.post('/tweet/delete')
                            .send({ id: '10003617-8b0e-57a8-8862-ba638224f35e' })
                            .then(function (res) {
                                expect(res).to.have.status(200);
                            });
                    });
                });
                describe('follow', () => {
                    it('it should follow other user', (done) => {
                        agent.post('follow')
                            .send({ followed: 'test2' })
                            .then(function (res) {
                                expect(res).to.have.status(200);
                            });
                    });
                });
                describe('ufollow', () => {
                    it('it should unfollow other user', (done) => {
                        agent.post('unfollow')
                            .send({ followed: 'test2' })
                            .then(function (res) {
                                expect(res).to.have.status(200);
                            });
                    });
                });
            });
    });
});
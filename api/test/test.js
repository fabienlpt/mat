const api = require('../index.js');
const request = require('supertest');

// define port for tests


// ------------------- MATERIAL -------------------

// Test bien ajouté en bdd (n=n+1)
describe('POST /api/material/create', function () {
    it('respond with 200 created', function (done) {
        request(api)
            .post('/api/material/create')
            .send({
                "name": "test",
                "description": "test",
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/material/get', () => {
    it('respond with json containing a list of all materials', function (done) {
        request(api)
            .get('/api/material/get')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/material/get/:id', () => {
    it('respond with json containing a single material', function (done) {
        request(api)
            .get('/api/material/get/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /api/material/update', () => {
    it('respond with 200 updated', function (done) {
        request(api)
            .put('/api/material/update')
            .send({
                "id": 1,
                "name": "test",
                "description": "test",
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('DELETE /api/material/delete', () => {
    it('respond with 200 deleted', function (done) {
        request(api)
            .delete('/api/material/delete')
            .send({
                "id": 1,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

// ---------------------------- LEND ----------------------------

describe('POST /api/lend/create', function (done) {
    it('respond with 200 created', function () {
        request(api)
            .post('/api/lend/create')
            .send({
                "material_id": 1,
                "email": "test@test.com",
                "lend_date": "2020-01-01",
                "return_date": "2020-01-01",
                "is_returned": 1,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/lend/get', () => {
    it('respond with json containing a list of all lends', function (done) {
        request(api)
            .get('/api/lend/get')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /api/lend/get/:id', () => {
    it('respond with json containing a single lend', function (done) {
        request(api)
            .get('/api/lend/get/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /api/lend/update', () => {
    it('respond with 200 updated', function (done) {
        request(api)
            .put('/api/lend/update')
            .send({
                "id": 1,
                "material_id": 1,
                "email": "test2@test2.com",
                "lend_date": "2020-01-01",
                "return_date": "2020-01-01",
                "is_returned": 1,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('DELETE /api/lend/delete', () => {
    it('respond with 200 deleted', function (done) {
        request(api)
            .delete('/api/lend/delete')
            .send({
                "id": 1,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/sendmail', function (done) {
    it('respond with 200 created', function () {
        request(api)
            .post('/api/sendmail')
            .send({
                "name": "test",
                "email": "fablap76710@gmail.com",
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



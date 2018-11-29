const assert = require('assert');
const request = require('supertest');
const { server } = require('../server');

describe('Server tests', () => {
  before(function(done) {
    this.server = server.listen(3000);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
  });

  describe('404', function () {
      it('shows a 404 HTML page', () => {
          return request(server)
              .get('/path/to/nowhere')
              .set('Accept', 'text/html')
              .catch(res => {
                  assert.equal(res.statusCode, 404);
                  assert.ok(res.error.indexOf('<html>') !== -1);
              })
      });
  });

  /**
   * News
   */
  describe('Get all news', () => {
    it('respond with json array of news', (done) => {
      request(server)
        .get('/api/news')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, response) {
          if (err) return done(err);
          assert(response.body.success, true)
          done();
        })
    })
  })

  /**
   * Transports
   */
  describe('All transports', () => {
    it('respond with json', () => {
        return request(server)
            .get('/api/transports')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.success, true)
            })
    })
  })

  describe('Create transport', () => {
    it('respond with json', () => {
        return request(server)
            .post('/api/transport')
            .set('Accept', 'application/json')
            .send({ title: 'my awesome transport' })
            .expect(200)
            .then(response => {
                assert(response.body.success, true)
            })
    })
  })

  describe('Read transport', () => {
    it('respond with json', () => {
        return request(server)
            .get('/api/transport/1')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                assert(response.body.success, true)
            })
    })
  })

  describe('Update transport', () => {
    it('respond with json', () => {
        return request(server)
            .put('/api/transport/10')
            .set('Accept', 'application/json')
            .send({ title: 'my awesome transport' })
            .expect(200)
    })
  })

  describe('Delete transport', () => {
    it('respond with json', () => {
        return request(server)
            .delete('/api/transport/0')
            .set('Accept', 'application/json')
            .expect(200)
    })
  })
});

'use strict';

const mock = require('egg-mock');

describe('test/joi-validator.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/joi-validator-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, joi')
      .expect(200);
  });
});

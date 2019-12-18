'use strict';
const _ = require('lodash');
module.exports = {
  async joiValidate(schema, options) {
    const pickedCtx = {};
    const mappings = {
      query: 'request.query',
      header: 'request.header',
      body: 'request.body',
    };
    Object.keys(schema).forEach(k => {
      pickedCtx[k] = _.get(this, (mappings[k] || k) || {});
    });
    const validationOptions = options || (this.app.config.joi && this.app.config.joi.options);
    try {
      const newCtx = await this.app.joi.validate(pickedCtx, schema, validationOptions);
      Object.keys(newCtx).forEach(k => {
        _.extend(_.get(this, (mappings[k] || k) || {}), newCtx[k]);
      });
    } catch (error) {
      this.throw(400, { message: error.details.map(d => ` [${d.path}:${d.message}]`).join(' ') });
    }
  },
};

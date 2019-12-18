'use strict';
const _ = require('lodash');
module.exports = {
  async validation(schema, options) {
    const pickedCtx = {};
    const mappings = {
      query: 'request.query',
      header: 'request.header',
      body: 'request.body',
    };
    Object.keys(schema).forEach(k => {
      pickedCtx[k] = _.get(this.app.ctx, (mappings[k] || k) || {});
    });
    const validationOptions = options || (this.app.config.joi && this.app.config.joi.options);
    console.log(pickedCtx);
    try {
      const newCtx = await this.app.joi.validate(pickedCtx, schema, validationOptions);
      Object.keys(newCtx).forEach(k => {
        _.extend(_.get(this.app.ctx, (mappings[k] || k) || {}), newCtx[k]);
      });
      console.log(newCtx);
    } catch (error) {
      console.log(error);
      this.app.ctx.throw(400, { message: error.details.map(d => ` [${d.path}:${d.message}]`).join(' ') });
    }
  },
};

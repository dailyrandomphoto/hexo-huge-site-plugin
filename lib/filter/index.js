'use strict';

module.exports = ctx => {
  const { filter } = ctx.extend;

  filter.unregister('before_generate', require('hexo/lib/plugins/filter/before_generate/render_post')); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
  filter.register('before_generate', require('./render_post'));
};

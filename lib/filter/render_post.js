'use strict';

const Promise = require('bluebird'); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
const concurrency = 50;

function renderPostFilter(data) {
  const renderPosts = model => {
    const posts = model.toArray().filter(post => post.content == null);

    return Promise.map(posts, post => {
      post.content = post._content;
      post.site = {data};

      return this.post.render(post.full_source, post).then(() => post.save());
    }, {concurrency: concurrency});
  };

  return Promise.all([
    renderPosts(this.model('Post')),
    renderPosts(this.model('Page'))
  ]);
}

module.exports = renderPostFilter;

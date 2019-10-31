'use strict';

const fs = require('fs');
const chalk = require('chalk'); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
const {
  save,
  load,
  toJSON,
  convert
} = require('./database.js');
const registerFilters = require('./filter');

const log = hexo.log;

const config = Object.assign({
  enable: false,
  database_format: 'v8se',
  concurrency: 10,
  // after merge https://github.com/dailyrandomphoto/hexo/tree/limit-rendering-concurrency branch, remove this
  overrideRenderPostFilter: false
}, hexo.config.huge_site_plugin);

/**
 * save database using v8 serialization
 */
function overrideDatabase() {
  if (config.database_format === 'json') {
    return;
  }
  const database = hexo.database;
  const orgPath = database.options.path;
  if (/\.json$/.test(orgPath)) {
    const newPath = database.options.path = orgPath.replace(/\.json$/, '.dat');
    log.debug('Writing database to %s', chalk.magenta(newPath));

    if (fs.existsSync(orgPath) && !fs.existsSync(newPath)) {
      const hexoLoad = hexo.load;
      const hexoWatch = hexo.watch;
      const filter = () => Promise.resolve()
        .then(() => { log.info('Converting %s to %s', chalk.magenta(orgPath), chalk.magenta(newPath)); })
        .then(() => convert(orgPath, newPath))
        .then(() => { log.debug('Converted %s to %s', chalk.magenta(orgPath), chalk.magenta(newPath)); })
        .catch(err => { throw err; });

      hexo.load = function() {
        return filter().then(hexoLoad.bind(hexo));
      };
      hexo.watch = function() {
        return filter().then(hexoWatch.bind(hexo));
      };
    }
  }

  // override database load, save method.
  database.load = load;
  database.save = save;
  database.toJSON = toJSON;
}

/**
 * force use concurrency option.
 * support form hexo@4.0.0
 */
function concurrency() {
  const args = hexo.env.args;
  let concurrency = parseInt(args.c || args.concurrency, 10);

  if (!concurrency || concurrency <= 0) {
    concurrency = parseInt(config.concurrency, 10);
    if (!concurrency || concurrency <= 0) {
      concurrency = 10;
    }
    args.c = args.concurrency = concurrency;
  }
}

if (config.enable) {
  log.debug('=========== %s ===========', chalk.cyan('hexo-huge-site-plugin'));
  log.debug('config %s', chalk.magenta(JSON.stringify(config)));
  concurrency();
  overrideDatabase();
  if (config.overrideRenderPostFilter) {
    registerFilters(hexo);
  }
}

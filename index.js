'use strict';

const chalk = require('chalk'); // eslint-disable-line node/no-extraneous-require
const {
  save,
  load,
  toJSON
} = require('./lib/database');

const log = hexo.log;

const config = Object.assign({
  enable: false,
  database_format: 'json',
  concurrency: 10
}, hexo.config.huge_site_plugin);

/**
 * save database using v8 serialization
 */
function overrideDatabase() {
  if (config.database_format === 'json') {
    return;
  }
  const database = hexo.database;
  if (/\.json$/.test(database.options.path)) {
    database.options.path = database.options.path.replace(/\.json$/, '.dat');
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
  log.info('=========== hexo-huge-site-plugin ===========');
  log.info('config %s', chalk.magenta(JSON.stringify(config)));
  concurrency();
  overrideDatabase();
}

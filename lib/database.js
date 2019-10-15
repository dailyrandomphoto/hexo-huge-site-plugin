'use strict';

const Promise = require('bluebird'); // eslint-disable-line node/no-missing-require
const Database = require('warehouse'); // eslint-disable-line node/no-missing-require
const WarehouseError = require('warehouse/error'); // eslint-disable-line node/no-missing-require
console.log(WarehouseError);
const {
  readFileSync,
  writeFileSync
} = require('node-serialization');

/**
 * Loads database.
 *
 * @param {function} [callback]
 * @return {Promise}
 */
function load(callback) {
  const path = this.options.path;

  if (!path) throw new WarehouseError('options.path is required');

  return new Promise((resolve, reject) => {
    const value = readFileSync(path);

    let oldVersion = value.meta.version;
    console.log('oldVersion ' + oldVersion);
    let models = value.models;
    for (let key in models) {
      // console.log("key " + key);
      this.model(key)._import(models[key]);
    }

    resolve(oldVersion);
  }).then(oldVersion => {
    const newVersion = this.options.version;

    if (newVersion > oldVersion) {
      return this.options.onUpgrade(oldVersion, newVersion);
    } else if (newVersion < oldVersion) {
      return this.options.onDowngrade(oldVersion, newVersion);
    }
  }).asCallback(callback);
}

/**
 * Saves database.
 *
 * @param {function} [callback]
 * @return {Promise}
 */
function save(callback) {
  const {
    path
  } = this.options;

  if (!path) throw new WarehouseError('options.path is required');

  return new Promise((resolve, reject) => {
    let value = this.toJSON();
    writeFileSync(path, value);
    resolve();
  }).asCallback(callback);
}

function toJSON() {
  const models = Object.keys(this._models)
    .reduce((obj, key) => {
      const value = this._models[key];
      if (value != null) obj[key] = modelToJSON(value);
      return obj;
    }, {});

  return {
    meta: {
      version: this.options.version,
      warehouse: Database.version
    },
    models
  };
}

function modelToJSON(model) {
  if (typeof model.toJSON !== 'function') {
    model.toJSON = function() {
      return this.map(item => this.schema._exportDatabase(item), {
        lean: true
      });
    };
  }
  return model.toJSON();
}

module.exports = {
  load,
  save,
  toJSON
};

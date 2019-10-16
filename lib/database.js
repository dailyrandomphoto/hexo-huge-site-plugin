'use strict';

const Promise = require('bluebird'); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
const Database = require('warehouse'); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
const WarehouseError = require('warehouse/lib/error'); // eslint-disable-line node/no-missing-require,node/no-extraneous-require
const {
  readFileSync,
  writeFileSync,
  deserializeJson,
  serialize,
  convert
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
    let models = value.models;
    for (let key in models) {
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

function convertJson(orgPath, newPath) {
  return convert(orgPath, deserializeJson, newPath, serialize);
}

module.exports = {
  load,
  save,
  toJSON,
  convert: convertJson
};

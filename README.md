# hexo-huge-site-plugin

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![dependencies Status][dependencies-image]][dependencies-url]
[![devDependencies Status][devDependencies-image]][devDependencies-url]

This plugin helps hexo to generate a huge site.

## Installation
```sh
npm install --save hexo-huge-site-plugin
```

## Configuration
Add `huge_site_plugin` options to the `_config.yml` file.
```
huge_site_plugin:
  enable: true
  concurrency: 10
  database_format: 'v8se'
```

- `enable` `<String>`
- `concurrency` `<Number>` Maximum number of files to be generated in parallel. Default value is `10`. [`hexo generate` options](https://hexo.io/docs/commands#generate)
- `database_format` `<String>` Default value is `v8se`.
  - `json` Save the database to file using JSON stringify. Default implementation.
  - `v8se` Save the database to file using v8 serialization.

## License
Copyright (c) 2019 dailyrandomphoto. Licensed under the [MIT license][license-url].

[npm-url]: https://www.npmjs.com/package/hexo-huge-site-plugin
[travis-url]: https://travis-ci.org/dailyrandomphoto/hexo-huge-site-plugin
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/hexo-huge-site-plugin?branch=master
[license-url]: LICENSE
[dependencies-url]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin
[devDependencies-url]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/hexo-huge-site-plugin.svg
[npm-version-image]: https://img.shields.io/npm/v/hexo-huge-site-plugin.svg
[license-image]: https://img.shields.io/npm/l/hexo-huge-site-plugin.svg
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/hexo-huge-site-plugin/master
[coveralls-image]: https://coveralls.io/repos/github/dailyrandomphoto/hexo-huge-site-plugin/badge.svg?branch=master
[dependencies-image]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin/status.svg
[devDependencies-image]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin/dev-status.svg

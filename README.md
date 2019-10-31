# hexo-huge-site-plugin

[![NPM Version][npm-version-image]][npm-url]
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
  overrideRenderPostFilter: true
```

- `enable` `<Boolean>` Enable hexo-huge_site_plugin.
  - Default value is `false`.
- `concurrency` `<Number>` Maximum number of files to be generated in parallel. [`hexo generate` options](https://hexo.io/docs/commands#generate)
  - Default value is `10`.
  - Set a small number or provide `-c` option on `generate` command if rendering HTML takes very long time or fails with OOM error.
- `database_format` `<String>`
  - Default value is `v8se`.
  - `json` Save the database to file using JSON stringify. Default implementation.
  - `v8se` Save the database to file using v8 serialization.
  - Set as `v8se` if save database fails.
- `overrideRenderPostFilter` `Boolean` Limit rendering concurrency to reduce memory usages.
  - Default value is `false`.
  - Enable it if rendering post takes very long time or fails with OOM error.

## License
Copyright (c) 2019 dailyrandomphoto. Licensed under the [MIT license][license-url].

[npm-url]: https://www.npmjs.com/package/hexo-huge-site-plugin
[travis-url]: https://travis-ci.org/dailyrandomphoto/hexo-huge-site-plugin
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/hexo-huge-site-plugin?branch=master
[license-url]: LICENSE
[dependencies-url]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin
[devDependencies-url]: https://david-dm.org/dailyrandomphoto/hexo-huge-site-plugin?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/hexo-huge-site-plugin
[npm-version-image]: https://img.shields.io/npm/v/hexo-huge-site-plugin
[license-image]: https://img.shields.io/npm/l/hexo-huge-site-plugin
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/hexo-huge-site-plugin
[coveralls-image]: https://img.shields.io/coveralls/github/dailyrandomphoto/hexo-huge-site-plugin
[dependencies-image]: https://img.shields.io/david/dailyrandomphoto/hexo-huge-site-plugin
[devDependencies-image]: https://img.shields.io/david/dev/dailyrandomphoto/hexo-huge-site-plugin

const glob = require('glob');
const compile = require('./sass-to-css');
const files = glob.sync('src/**/*.scss', {ignore: '**/common.scss'});

files.forEach(function (path) {
  compile(path);
});

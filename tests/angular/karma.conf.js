module.exports = function(config) {
  const DEPENDENCIES = require('wiredep')(require('../../package.json').wiredep);
  const APP_FILES = [
      'src/app/**/*.module.js',
      'src/app/**/*!(module).js',

      'test/angular/**/*.js'
  ];

  var userConfig = {
    basePath : '../../',

    files : DEPENDENCIES.js,

    preprocessors : {
      'src/app/**/*.js': 'coverage'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    reporters : ['progress', 'coverage'],

    plugins : [
      // 'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ],

    coverageReporter : {
      type : 'html',
      dir : 'coverage-angular/'
    }
  };

  userConfig.files = userConfig.files.concat('tests/angular/before.js');
  userConfig.files = userConfig.files.concat('src/bower_components/angular-mocks/angular-mocks.js');
  userConfig.files = userConfig.files.concat(APP_FILES);
  userConfig.files = userConfig.files.concat('tests/angular/**/*.js');

  userConfig.phantomjsLauncher = {
    exitOnResourceError: true
  };

  config.set(userConfig);
};

exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: 'js/app.js',

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //  'js/app.js': /^(web\/static\/js)/,
      //  'js/vendor.js': /^(web\/static\/vendor)|(deps)/
      // }
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     'web/static/vendor/js/jquery-2.1.1.js',
      //     'web/static/vendor/js/bootstrap.min.js'
      //   ]
      // }
    },
    stylesheets: {
      joinTo: 'css/app.css',
      order: {
        after: ['css/app.css'], // concat app.css last
        before: [
          'node_modules/bootstrap/dist/css/bootstrap',
        ],
      },
    },
    templates: {
      joinTo: 'js/app.js',
    },
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to '/web/static/assets'. Files in this directory
    // will be copied to `paths.public`, which is 'priv/static' by default.
    assets: /^(static)/,
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ['static', 'css', 'js', 'vendor'],

    // Where to compile files to
    public: '../priv/static',
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ['es2015', 'react', 'stage-0', 'stage-2'],
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/],
    },
    eslint: {
      pattern: /^web\/static\/js\/.*\.js?x?$/,
      warnOnly: true,
    },
  },

  modules: {
    autoRequire: {
      'js/app.js': ['js/app'],
    },
  },

  npm: {
    enabled: true,
    styles: {
      sweetalert2: ['dist/sweetalert2.min.css'],
      'react-image-crop': ['dist/ReactCrop.css'],
    },
    globals: { // bootstrap JavaScript requires both '$' and 'jQuery' in global scope
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether',
      bootstrap: 'bootstrap',
    },
  },
};

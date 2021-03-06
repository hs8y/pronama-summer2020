const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix.webpackConfig({
  resolve: {
    fallback: { "path": require.resolve("path-browserify") },
  }
});

mix.setPublicPath('dist');

mix.options({
  processCssUrls: false,
})

mix
  .js('src/js/app.js', 'dist/js/').vue()
  .sass('src/sass/app.scss', 'dist/css/')
  .extract()
  .copyDirectory('src/images', 'dist/images')
  .copyDirectory('src/fonts', 'dist/fonts')
  .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'dist/fonts/vender')
  .copy('src/index.html', 'dist/');

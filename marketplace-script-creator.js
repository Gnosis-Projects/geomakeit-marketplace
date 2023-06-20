const concat = require('concat');
(async function build() {
  const files = [
    './marketplace/runtime.js',
    './marketplace/polyfills.js',
    './marketplace/main.js',
    './marketplace/scripts.js'
  ];
  await concat(files, './marketplace/marketplace-scripts.js');
})();

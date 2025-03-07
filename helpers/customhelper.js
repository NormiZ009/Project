const hbs = require('hbs');

// Register the "ep" helper
hbs.registerHelper('ep', function (a, b, options) {
  return a === b; // Returns true if values match
});

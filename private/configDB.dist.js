/* Copy /private/configDB.dist.js to /private/configDB.js
 * Edit configDB.js file
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://<login>:<password>@<url>:<port>/<db>/');
module.exports = mongoose;
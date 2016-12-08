/* Copy /private/amazon.dist.js to /private/amazon.js
 * Edit your amazon.js file
 */
var util = require('util');
var OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId:     'your_awsId',
    awsSecret: 'your_awsSecret',
    assocId:   'your_assocId',
    locale:    'your_locale'
});

module.exports = opHelper;
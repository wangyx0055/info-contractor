/* 
 * @Author: boxizen
 * @Date:   2015-12-09 12:36:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 12:36:28
 */

'use strict';

module.exports = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
/* 
 * @Author: boxizen
 * @Date:   2015-12-17 14:25:05
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-17 14:33:07
 */

'use strict';

var Entry = require('../../components/entry/entry');

// 检索对象
function onGet(req, res) {
    var id = req.query.id;
    Entry.take(function(result) {
        res.send(result);
    });
}

module.exports = [
    ['get', '/entry/onGet', onGet]  
];
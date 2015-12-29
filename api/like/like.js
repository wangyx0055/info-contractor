/* 
* @Author: boxizen
* @Date:   2015-12-29 18:17:21
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-29 18:23:26
*/

'use strict';

var Target = require('../../components/target/target');

// 添加线索
function onSave(req, res) {
    var pid = req.query.id;

    Target.like(pid, function(err, result) {
        if (err) {
            res.send(null);
            return;
        }
        res.send(result);
    });
}

module.exports = [
    ['get', '/like/onSave', onSave]
];
/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:12
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 01:30:47
 */

'use strict';

var Clue = require('../../components/clue/clue');

// 添加线索
function onCreate(req, res) {
    var object = {
        url: req.body.url,        
        tag: req.body.tag,
        original: req.body.original,
        author: req.body.author

        // ip: req.body.ip,
        // data: req.body.data,
        // domain: req.body.domain,
        // eid: req.body.eid,
        // weight: req.body.weight
    }
    Clue.create(object, function(err, result) {
        if (err) {
            res.send(null);
            return;
        }
        res.send(result);
    });
}

// 检索对象
function onGet(req, res) {
    var id = req.query.id;
    Clue.search(id, function(err, result) {
        if (err) {
            res.send(null);
            return;
        }
        res.send(result);
    });
}

// 批量获取对象
function onGetList(req, res) {
    var options = {
        num: 10,
        fromSpy: true
    }
    Clue.fetch(options, function(err, result) {
        if (err) {
            res.send(null);
            return;
        }
        res.send(result);
    });
}

module.exports = [
    ['put', '/clue/onCreate', onCreate],
    ['get', '/clue/onGet', onGet],
    ['get', '/clue/onGetList', onGetList]
];
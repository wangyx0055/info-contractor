/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:42
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 14:52:42
 */


'use strict';

var Harvest = require('../../components/harvest/harvest');

// 添加对象
function saveHarvest(req, res) {

    var task = req.body;

    Harvest.create(task, function(err, result) {
        console.log("收集数据完毕");
    })
}

// 查找列表
function fetchHarvest(req, res) {

    var cat = req.query.category,
        tag = req.query.tag,
        page = req.query.page;

    Harvest.fetch({
    	cat: cat,
    	tag: tag,
        page: page
    }, function(err, result) {
        var obj = {
            data: result
        }
        res.send(obj);
    })
}

// 查找列表
function getHarvest(req, res) {

    var oid = req.query.oid;

    Harvest.get({
        oid: oid
    }, function(err, result) {
        var obj = {
            data: result
        }
        res.send(obj);
    })
}

module.exports = [
    ['put', '/harvest/onCreate', saveHarvest],
    ['get', '/harvest/onGet', getHarvest],
    ['get', '/harvest/onGetList', fetchHarvest],    
];
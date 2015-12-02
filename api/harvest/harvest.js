/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:42
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-01 17:22:18
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
	Harvest.fetch(function(err, result) {
		var obj = {
			data: result
		}
		res.send(obj);
	})
}

module.exports = [
    ['put', '/harvest/onCreate', saveHarvest],
    ['get', '/harvest/onGetList', fetchHarvest],
];
/* 
 * @Author: boxizen
 * @Date:   2015-12-01 11:33:25
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-05 21:16:37
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf'),
    Monitor = require('../monitor/monitor');

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Clue = AV.Object.extend('Clue');

// 创建对象
function create(object, callback) {

    // 保存clue数据
    var clue = new Clue();
    clue.save(object, {
        success: function(result) {
            callback(null, result);
        },
        error: function(error) {
            callback('保存失败', null);
        }
    })

    /*Monitor.uniq(object.url).then(function(result) {
        // 备份clue数据
        Monitor.create(clue, function(err, result) {

        })
    }, function(error) {
        callback("重复url", null);
    });*/
}
exports.create = create;

// 查找对象
function search(id, callback) {
    var query = new AV.Query(Clue);
    query.get(id, {
        success: function(clue) {
            callback(null, clue);
        },
        error: function(error) {
            callback('查找失败', null);
        }
    });
}
exports.search = search;

// 获取对象
function fetch(options, callback) {
    var query = new AV.Query(Clue);
    var fromSpy = options.fromSpy;
    query.equalTo("available", "1");
    query.ascending("createdAt");
    query.limit(options.num);
    query.find({
        success: function(results) {
            if (fromSpy) {
                updateList(results);
            }
            callback(null, results);
        },
        error: function(error) {
            callback('查找失败', null);
        }
    });
}
exports.fetch = fetch;

// 修改对象
function updateList(results) {
    results.forEach(function(item) {
        item.set('available', '0');
        item.save();
    })
}

// 删除对象
function deleteList(results, callback) {
    var query = new AV.Query(Clue);

    results.forEach(function(item) {
        query.equalTo("objectId", item.id);
        query.destroyAll({
            success: function() {
                callback(null, results);
            },
            error: function(err) {
                callback("删除失败", null);
            }
        });
    })
}
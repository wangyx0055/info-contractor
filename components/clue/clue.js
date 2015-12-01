/* 
 * @Author: boxizen
 * @Date:   2015-12-01 11:33:25
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-01 13:55:11
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf');

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Clue = AV.Object.extend('Clue');

// 查找重复url的记录
function isDul(url) {
    var deferred = Q.defer(),
        query = new AV.Query(Clue);
    query.equalTo('url', url);
    query.find({
        success: function(results) {
            if (results.length == 0) {
                deferred.resolve();
            } else {
                deferred.reject("重复");
            }
        },
        error: function(error) {
            deferred.reject("查询出错");
        }
    });
    return deferred.promise;
}

// 创建对象
function create(object, callback) {
    isDul(object.url).then(function(result) {
        var clue = new Clue();
        clue.save(object, {
            success: function(result) {
                callback(null, result);
            },
            error: function(error) {
                callback('保存失败', null);
            }
        })
    }, function(error) {
        callback("重复url", null);
    });
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
    query.ascending("createdAt");
    query.limit(options.num);
    query.find({
        success: function(results) {
            callback(null, results);
        },
        error: function(error) {
            callback('查找失败', null);
        }
    });
}
exports.fetch = fetch;
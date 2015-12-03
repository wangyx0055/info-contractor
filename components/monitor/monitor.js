/* 
 * @Author: boxizen
 * @Date:   2015-12-02 17:48:24
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-02 18:40:31
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf'),

    logger = console;

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Monitor = AV.Object.extend('Monitor');

// 查找是否存在重复url记录
function uniq(url) {
    var deferred = Q.defer();    
    var query = new AV.Query(Monitor);
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
exports.uniq = uniq;

// 创建对象
function create(object, callback) {
    var monitor = new Monitor();
    monitor.save(object, {
        success: function(result) {
            callback(null, result);
        },
        error: function(error) {
            callback('保存失败', null);
        }
    })
}
exports.create = create;
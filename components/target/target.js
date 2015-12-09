/* 
 * @Author: boxizen
 * @Date:   2015-12-01 14:11:43
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 11:52:59
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf');

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Target = AV.Object.extend('Target');

// 创建对象
function create(object, callback) {
    var target = new Target();
    target.save(object, {
        success: function(result) {
            callback(null, result);
        },
        error: function(error) {
            callback('保存失败', null);
        }
    })
}
exports.create = create;

// 获取对象
function fetch(options, callback) {
    var query = new AV.Query(Target);
    if (options.cat) {
        query.equalTo("category", parseInt(options.cat));
    }
    if (options.tag) {
        query.equalTo("tag", options.tag);
    }
    if (options.page) {
        var page = parseInt(options.page) - 1;
        query.skip(10 * page);
        query.limit(10);
    }
    query.descending("publishAt");
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
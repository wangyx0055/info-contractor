/* 
 * @Author: boxizen
 * @Date:   2015-12-06 15:11:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-16 01:40:17
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf'),
    Monitor = require('../monitor/monitor');

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Entry = AV.Object.extend('Entry');

function fetch(callback) {
    var query = new AV.Query(Entry);
    query.equalTo("available", "1");
    query.limit(1);
    query.ascending("createdAt");

    query.find({
        success: function(results) {
            if (results.length > 0) {
                update({
                    id: results[0].id,
                    active: '0'
                }, function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                });
            }
            callback(null, results);
        },
        error: function(error) {
            callback('查找失败', null);
        }
    });
}
exports.fetch = fetch;

function validate(callback) {
    var query = new AV.Query(Entry);
    query.limit(10);
    query.ascending("createdAt");

    query.find({
        success: function(results) {
            callback(null, results);
        },
        error: function(error) {
            callback('查找失败', null);
        }
    });
}
exports.validate = validate;

function update(options, callback) {
    var query = new AV.Query(Entry);
    query.get(options.id, {
        success: function(entry) {
            entry.set('available', options.active);
            entry.set('lastUpdatedAt', new Date().valueOf());
            entry.save();
            callback(null, '更新成功');
        },
        error: function(object, error) {
            console.log(object);
            callback('更新失败', null);
        }
    });
}
exports.update = update;
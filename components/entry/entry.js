/* 
 * @Author: boxizen
 * @Date:   2015-12-06 15:11:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-17 14:37:33
 */

'use strict';

var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf'),
    Monitor = require('../monitor/monitor');

// 采用leanCloud云存储
AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Entry = AV.Object.extend('Entry');

var status = require('../status/status');

function take(callback) {
    var query = new AV.Query('Entry');
    query.ascending('createdAt');
    query.equalTo('available', '1');
    query.limit(1);

    query.find().then(function(results) {
        if (results.length == 0) {
            callback(status(0, '没有entry需要更新'));
        } else {
            results[0].set('available', '0');
            results[0].set('lastUpdatedAt', new Date().valueOf());
            results[0].save();
            callback(status(1, results[0]));
        }

    }, function(error) {
        callback(status(0, error));

    });
}
exports.take = take;

function active(callback) {
    var query = new AV.Query('Entry');
    query.ascending('createdAt');
    query.equalTo('available', '0');
    query.limit(1);

    query.find().then(function(results) {
        if (results.length == 0) {
            return AV.Promise.error(0);
        }
        var lastTime = results[0].get('lastUpdatedAt'),
            interval = results[0].get('updateInterval'),
            curTime = new Date().valueOf();
        if ((curTime - lastTime) > interval) {
            results[0].set('available', '1');
            results[0].set('lastUpdatedAt', curTime);
            return results[0].save();
        }

    }, function(error) {
        return AV.Promise.error('查找entry失败');

    }).then(function(obj) {
        callback(status(1, 'active'));

    }, function(error) {
        if (error != 0) {
            callback(status(0, error));
        }

    });
}
exports.active = active;
/* 
 * @Author: boxizen
 * @Date:   2015-12-06 15:11:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-20 17:34:51
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
    query.find({
        success: function(results) {
            var isOk = false;
            if (results.length == 0) {
                callback(status(0, '没有entry可更新'));
            }
            results.forEach(function(result) {
                var lastTime = result.get('lastUpdatedAt'),
                    interval = result.get('updateInterval'),
                    curTime = new Date().valueOf();
                if ((curTime - lastTime) > interval) {
                    isOk = true;
                    result.set('available', '1');
                    result.set('lastUpdatedAt', curTime);
                    result.save();
                }
            })
            if (isOk) {
                callback(status(1, '更新成功'));
            } else {
                callback(status(0, '没有需要更新的entry'));
            }

        },
        error: function(error) {
            callback(status(0, '查找entry失败'));
        }
    });
}
exports.active = active;
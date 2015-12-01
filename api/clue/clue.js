/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:12
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-01 11:26:38
 */

'use strict';
var Q = require('q'),
    AV = require('avoscloud-sdk'),
    conf = require('../../conf');

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

// 添加线索
function saveClue(req, res) {
    var url = req.body.url,
        domain = req.body.domain,
        tag = req.body.tag,
        ip = req.body.ip,
        data = req.body.data,
        eid = req.body.eid,
        weight = req.body.weight;

    isDul(url).then(function(result) {
        var clue = new Clue();
        clue.save({
            url: url,
            domain: domain,
            tag: tag,
            ip: ip,
            data: data,
            eid: eid,
            weight: 0,
        }, {
            success: function(object) {
                console.log("保存成功");
                res.send("成功");
            },
            error: function(error) {
                console.log("保存出错");
                res.send("失败");
            }
        })
    }, function(error) {
        console.log(error);
        res.send("失败");
    });
}

// 检索对象
function getClue(req, res) {
    var id = req.query.id;
    var query = new AV.Query(Clue);
    query.get(id, {
        success: function(clue) {
            res.send(clue);
        },
        error: function(error) {
            res.send("失败");
        }
    });
}

// 批量获取对象
function fetchClue(req, res) {
    var query = new AV.Query(Clue);
    query.ascending("createdAt");
    query.limit(1);
    query.find({
        success: function(results) {
            res.send(results);
        },
        error: function(error) {
            res.send("失败");
        }
    });
}

module.exports = [
    ['put', '/clue/saveClue', saveClue],
    ['get', '/clue/getClue', getClue],
    ['get', '/clue/fetchClue', fetchClue]
];
/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:12
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-28 15:58:00
 */

'use strict';

var AV = require('avoscloud-sdk'),
    conf = require('../../conf');

AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Clue = AV.Object.extend('Clue');

// 添加线索
function saveClue(req, res) {
    var url = req.body.url,
        domain = req.body.domain,
        tag = req.body.tag,
        ip = req.body.ip,
        data = req.body.data,
        cid = req.body.cid,
        weight = req.body.weight;

    var query = new AV.Query(Clue);
    query.equalTo("url", url);
    query.find({
        success: function(results) {
            if (results.length == 0) {
                var clue = new Clue();
                clue.save({
                    url: url,
                    domain: domain,
                    tag: tag,
                    ip: ip,
                    data: data,
                    cid: cid,
                    weight: 0,
                }, {
                    success: function(object) {
                        console.log("保存成功");
                        res.send("ok");
                    },
                    error: function(error) {
                        console.log("保存出错");
                        res.send("not ok");
                    }
                })
            } else {
                console.log("url重复");
                res.send("not ok");
            }
        },
        error: function(error) {
            res.send("not ok");
        }
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
    query.limit(10);
    query.find({
        success: function(results) {
            results.forEach(function(item) {
                console.log(item.get('domain'));
            })
            res.send("good");
        },
        error: function(error) {
            
        }
    });
}

module.exports = [
    ['put', '/clue/saveClue', saveClue],
    ['get', '/clue/getClue', getClue],
    ['get', '/clue/fetchClue', fetchClue]
];
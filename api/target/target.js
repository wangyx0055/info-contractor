/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:42
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-28 17:19:04
 */


'use strict';

var AV = require('avoscloud-sdk'),
    conf = require('../../conf');

AV.initialize(conf.leancloud.appid, conf.leancloud.appkey);
var Target = AV.Object.extend('Target');

// 添加线索
function saveTarget(req, res) {    
    var options = {
        url: req.body.url,
        title: req.body.title,
        tag: req.body.tag,
        cover: req.body.cover,
        pubdate: req.body.pubdate,
        content: req.body.content,
        like: req.body.like,
        cid: req.body.cid
    }

    var target = new Target();

    target.save(options, {
        success: function(object) {
            console.log("保存成功");
            res.send("ok");
        },
        error: function(error) {
            console.log("保存出错");
            res.send("not ok");
        }
    })
}

// 检索对象
function getTarget(req, res) {
    var id = req.query.id;
    var query = new AV.Query(Target);
    query.get(id, {
        success: function(target) {
            res.send(target);
        },
        error: function(error) {
            res.send("失败");
        }
    });
}

module.exports = [
    ['put', '/target/saveTarget', saveTarget],
    ['get', '/target/getTarget', getTarget]
];
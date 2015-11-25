/* 
 * @Author: boxizen
 * @Date:   2015-11-25 10:58:12
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-25 17:21:40
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
            console.log("successfully save clue");
        },
        error: function(post)
    })

    res.send("successfully");
}

// 检索对象
module.exports = [
    ['all', '/clue/saveClue', saveClue]
];
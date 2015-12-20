/* 
 * @Author: boxizen
 * @Date:   2015-12-05 00:20:54
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-20 20:27:43
 */

'use strict';

var Schedule = require('node-schedule'),
    mq = require('../components/mq/mq'),
    Entry = require('../components/entry/entry');

// 定时任务
function cronJob() {
    var rule = new Schedule.RecurrenceRule(),
        time = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    rule.second = time;

    Schedule.scheduleJob(rule, function() {
        Entry.active(function(res) {
            if (res.status == 0) {
                console.log(res.result);
            }
            console.log(res);
        })
    });
}
exports.cronJob = cronJob;
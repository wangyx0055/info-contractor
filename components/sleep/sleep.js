/* 
 * @Author: boxizen
 * @Date:   2015-12-09 00:50:52
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 00:54:28
 */

'use strict';

module.exports = function(sec) {
    for (var start = new Date().valueOf(); new Date().valueOf() - start <= sec;) {}
}
/* 
* @Author: boxizen
* @Date:   2015-11-23 16:58:22
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-23 17:36:39
*/

'use strict';

var express = require('express'),

    conf = require('../conf'),

    // middleware = {       
    //     api: require('./api'),
    //     router: require('./router'),
    //     static: require('./static'),
    // },

    app = express(),
    logger = console;

function init() {
	conf.init();
	logger.info(conf);
}

init();
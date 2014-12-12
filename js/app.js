'use strict';

var m = require('mithril'),
    TodoModule = require('./modules/todo');

window.addEventListener('load', function() {
    m.route.mode = 'hash';
    m.route(document.querySelector('.js-container'), '/', {
        '/': TodoModule,
        '/:filter': TodoModule
    });
});

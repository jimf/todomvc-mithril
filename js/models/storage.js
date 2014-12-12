'use strict';

var STORAGE_KEY = 'todos-mithril';

function get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
}

function set(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

module.exports = {
    get: get,
    set: set
};

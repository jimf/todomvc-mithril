'use strict';

var m = require('mithril'),
    STORAGE_KEY = 'todos-mithril';

function genModelId() {
    return Math.floor(Math.random() * 999999999);
}

function Todo(data) {
    this.id        = m.prop(data.id || genModelId());
    this.title     = m.prop(data.title || '');
    this.completed = m.prop(data.completed || false);
}

Todo.list = function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos.map(function(todoData) {
        return new Todo(todoData);
    });
};

Todo.save = function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

module.exports = Todo;

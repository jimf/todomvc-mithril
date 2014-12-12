'use strict';

var m = require('mithril'),
    Todo = require('../../models/todo');

function todoState() {
    return {
        title: m.prop(''),
        editable: m.prop(false)
    };
}

function ViewModel() {}

ViewModel.prototype.init = function() {
    this.todos = Todo.list();
    this.title = m.prop('');
    this.filter = m.prop(m.route.param('filter') || '');
    this.map = {};

    this.todos.forEach(function(todo) {
        this.map[todo.id()] = todoState();
    }, this);
};

ViewModel.prototype.add = function(title) {
    if (title().trim()) {
        var todo = new Todo({ title: title() });
        this.map[todo.id()] = todoState();
        this.todos.push(todo);
        this.title('');
        Todo.save(this.todos);
    }
};

ViewModel.prototype.complete = function(todo, complete) {
    todo.completed(complete);
    Todo.save(this.todos);
};

ViewModel.prototype.edit = function(todo) {
    this.map[todo.id()].editable(true);
    this.map[todo.id()].title(todo.title());
};

ViewModel.prototype.doneEditing = function(todo, index) {
    if (!todo || !this.map[todo.id()]) { return; }
    var value = this.map[todo.id()].title().trim();
    this.map[todo.id()].editable(false);
    todo.title(value);

    if (!value) {
        return this.remove(index);
    }

    Todo.save(this.todos);
};

ViewModel.prototype.cancelEditing = function(todo) {
    this.map[todo.id()].title(todo.title());
    this.map[todo.id()].editable(false);
};

ViewModel.prototype.isVisible = function(todo) {
    if (this.filter() === 'active') {
        return !todo.completed();
    } else if (this.filter() === 'completed') {
        return todo.completed();
    } else {
        return true;
    }
};

ViewModel.prototype.remove = function(index) {
    var todo = this.todos[index];
    delete this.map[todo.id()];
    this.todos.splice(index, 1);
    m.redraw();
    // Todo.save(this.todos);
};

ViewModel.prototype.save = function() {
    Todo.save(this.todos);
};

module.exports = new ViewModel();

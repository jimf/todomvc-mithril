'use strict';

var m = require('mithril'),
    vm = require('./vm'),
    ENTER_KEY = 13,
    ESCAPE_KEY = 27;

function onKeystroke(options) {
    return function(e) {
        if (e.keyCode === ENTER_KEY) {
            options.onEnter();
        } else if (e.keyCode === ESCAPE_KEY) {
            options.onEscape();
        }
    };
}

function compose(f, g) {
    return function() {
        return f.call(this, g.apply(this, arguments));
    };
}

function vrenderTodo(todo, index) {
    var liClasses = [];

    if (vm.map[todo.id()].editable()) { liClasses.push('editing'); }
    if (todo.completed()) { liClasses.push('completed'); }

    return m('li', {
        'class': liClasses.length ? liClasses.join(' ') : undefined
    }, [
        m('div.view', [
            m('input.toggle', {
                type: 'checkbox',
                checked: todo.completed() ? 'checked' : '',
                onchange: m.withAttr('checked', vm.complete.bind(vm, todo))
            }),
            m('label', { ondblclick: vm.edit.bind(vm, todo) }, todo.title()),
            m('button.destroy', {
                onclick: compose(vm.save.bind(vm), vm.remove.bind(vm, index))
            })
        ]),
        m('input.edit', {
            value: vm.map[todo.id()].title(),
            config: function(element) {
                if (vm.map[todo.id()].editable()) {
                    element.focus();
                }
            },
            oninput: m.withAttr('value', vm.map[todo.id()].title),
            onblur: vm.doneEditing.bind(vm, todo, index),
            onkeyup: onKeystroke({
                onEnter: vm.doneEditing.bind(vm, todo, index),
                onEscape: vm.cancelEditing.bind(vm, todo)
            })
        })
    ]);
}

function vrenderFooter() {
    var hasTodos = vm.todos.length > 0,
        numCompleted = vm.todos.filter(function(todo) {
            return todo.completed();
        }).length,
        numIncomplete = vm.todos.length - numCompleted;

    return m('footer#footer', {
        style: { display: hasTodos ? 'block' : 'none' }
    }, [
        m('span#todo-count', [
            m('strong', numIncomplete.toString()),
            numIncomplete === 1 ? ' item left' : ' items left'
        ]),
        m('ul#filters', [
            m('li', [
                m('a[href=/]', {
                    config: m.route,
                    'class': vm.filter() === '' ? 'selected' : ''
                }, 'All'),
                m('a[href=/active]', {
                    config: m.route,
                    'class': vm.filter() === 'active' ? 'selected' : ''
                }, 'Active'),
                m('a[href=/completed]', {
                    config: m.route,
                    'class': vm.filter() === 'completed' ? 'selected' : ''
                }, 'Completed')
            ])
        ]),
        m('button#clear-completed', {
            style: {
                display: numCompleted ? 'block' : 'none'
            },
            onclick: function() {
                for (var i = vm.todos.length - 1; i >= 0; i -= 1) {
                    if (vm.todos[i].completed()) {
                        vm.remove(i);
                    }
                }
            }
        }, [
            'Clear completed (' + numCompleted + ')'
        ])
    ]);
}

module.exports = function() {
    var hasTodos = vm.todos.length > 0,
        allComplete = hasTodos && !vm.todos.some(function(todo) {
            return !todo.completed();
        });

    console.log('here');

    return m('div.container', [
        m('section#todoapp', [
            m('header#header', [
                m('h1', 'todos'),
                m('input#new-todo', {
                    value: vm.title(),
                    placeholder: 'What needs to be done?',
                    autofocus: true,
                    oninput: m.withAttr('value', vm.title),
                    onkeypress: function(e) {
                        if (e.keyCode === ENTER_KEY) {
                            vm.add(vm.title);
                        }
                    }
                })
            ]),
            m('section#main', {
                style: {
                    display: hasTodos ? 'block' : 'none'
                }
            }, [
                m('input#toggle-all', {
                    type: 'checkbox',
                    checked: allComplete ? 'checked' : '',
                    onclick: function(e) {
                        vm.todos.forEach(function(todo) {
                            todo.completed(e.currentTarget.checked);
                        });
                    }
                }),
                m('label', { 'for': 'toggle-all' }, 'Mark all as complete'),
                m('ul#todo-list', [
                    vm.todos.filter(vm.isVisible.bind(vm)).map(vrenderTodo)
                ])
            ]),
            vrenderFooter()
        ]),
        m('footer#info', [
            m('p', 'Double-click to edit a todo'),
            m('p', 'Written by Jim Fitzpatrick'),
            m('p', [
                'Part of ',
                m('a', { href: 'http://todomvc.com' }, 'TodoMVC')
            ])
        ])
    ]);
};

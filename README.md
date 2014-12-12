# Mithril TodoMVC Example

> [Mithril](http://lhorie.github.io/mithril/) is a client-side MVC framework - a tool to organize code in a way that is easy to think about and to maintain.

> _[Mithril - lhorie.github.io/mithril/](http://lhorie.github.io/mithril/)_


## Learning Mithril

The [Mithril website](http://lhorie.github.io/mithril/getting-started.html) is a great resource for getting started.

Here are some links you may find helpful:

* [Official Documentation](http://lhorie.github.io/mithril/mithril.html)


## Implementation

Playground project for trying out Mithril. Still a work in progress, though the
entire [TodoMVC spec](https://github.com/tastejs/todomvc/blob/master/app-spec.md)
should be implemented and working. Just not completely happy with how save is
working at the moment (would like to abstract it further), and I'm still
refactoring some of the event handlers in the view (making better use of `m.withAttr`,
as well as moving the function definitions into the view model).


## Running

    $ npm run build
    $ open index.html


## Credit

This TodoMVC application was created by [Jim Fitzpatrick](https://github.com/jimf).

ember-list-walker
==============================================================================

Walk a ArrayProxy list with index tracking, and next and previous steps.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-list-walker
```


Usage
------------------------------------------------------------------------------

```
import listWalker from 'ember-list-walker';

const list = listWalker(['a', 'b', 'c']);

list.index === 0;
list.nextIndex === 1;
list.previousIndex === undefined;
list.isFirst === true;
list.isLast === false;

list.current === 'a';

list.next() === 'b';

list.index === 1;
list.nextIndex === 2;
list.previousIndex === 0;
list.isFirst === false;
list.isLast === false;

list.current === 'b';

list.next() === 'c';

list.index === 2;
list.nextIndex === undefined;
list.previousIndex === 1;
list.isFirst === false;
list.isLast === true;

list.current === 'c';
// moving foward at end of list stays at end
list.next() === 'c';

list.index === 2;
list.nextIndex === undefined;
list.previousIndex === 1;
list.isFirst === false;
list.isLast === true;

list.current === 'c';

list.previous() === 'b';

list.index === 1;
list.nextIndex === 2;
list.previousIndex === 0;
list.isFirst === false;
list.isLast === false;

list.current === 'b';

list.previous() === 'a';

// moving backward at start of list stays at start
list.previous() === 'a';

list.index === 0;
list.nextIndex === 1;
list.previousIndex === undefined;
list.isFirst === true;
list.isLast === false;

list.current === 'a';

// can set current directly
list.setCurrent(item => item === 'c') === 'c'

list.index === 2;
list.nextIndex === undefined;
list.previousIndex === 1;
list.isFirst === false;
list.isLast === true;

list.current === 'c';

list.previous() === 'b';

// can set current to extraneous result keeps it where it is
list.setCurrent(item => item === 'z') === 'b'

list.index === 1;
list.nextIndex === 2;
list.previousIndex === 0;
list.isFirst === false;
list.isLast === false;

list.current === 'b';
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

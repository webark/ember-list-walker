import { listWalker } from 'ember-list-walker/utils/list-walker';
import { module, test } from 'qunit';

module('Unit | Utility | list-walker', function () {
  test('it starts at zero index', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.current, 'a', 'inital current check');

    checkStart(assert, walker);
  });

  test('going back from start has no effect', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.current, 'a', 'inital current check');
    assert.equal(walker.previous(), 'a', 'previous from start');

    checkStart(assert, walker);
  });

  test('going forward changes index', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.next(), 'b', 'next from start');

    checkMiddle(assert, walker);
  });

  test('going back from forward changes index back', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.next(), 'b', 'next from start');
    assert.equal(walker.previous(), 'a', 'previous from middle');

    checkStart(assert, walker);
  });

  test('going forward to end changes index', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.current, 'a'), 'inital current check';
    assert.equal(walker.next(), 'b', 'next from start');
    assert.equal(walker.next(), 'c', 'next from middle');

    checkEnd(assert, walker);
  });

  test('going back from end changes index back', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.next(), 'b', 'next from start');
    assert.equal(walker.next(), 'c', 'next from middle');
    assert.equal(walker.previous(), 'b', 'previous from end');

    checkMiddle(assert, walker);
  });

  test('going forward from end has no effect', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.next(), 'b', 'next from start');
    assert.equal(walker.next(), 'c', 'next from middle');
    assert.equal(walker.next(), 'c', 'next from end');

    checkEnd(assert, walker);
  });

  test('set current start', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(
      walker.setCurrent((item) => item === 'a'),
      'a',
      'set current to start'
    );

    checkStart(assert, walker);
  });

  test('set current middle', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(
      walker.setCurrent((item) => item === 'b'),
      'b',
      'set current to middle'
    );

    checkMiddle(assert, walker);
  });

  test('set current end', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(
      walker.setCurrent((item) => item === 'c'),
      'c',
      'set current to end'
    );

    checkEnd(assert, walker);
  });

  test('set current extraneous', function (assert) {
    const walker = listWalker(['a', 'b', 'c']);

    assert.equal(walker.next(), 'b', 'next from start');
    assert.equal(
      walker.setCurrent((item) => item === 'd'),
      'b',
      'set current to extraneous'
    );

    checkMiddle(assert, walker);
  });
});

function checkStart(assert, walker) {
  assert.equal(walker.index, 0, 'index');
  assert.equal(walker.nextIndex, 1, 'next index');
  assert.equal(walker.previousIndex, undefined, 'previous index');
  assert.equal(walker.isFirst, true, 'isFirst');
  assert.equal(walker.isLast, false, 'isLast');

  assert.equal(walker.current, 'a', 'current check');
}

function checkMiddle(assert, walker) {
  assert.equal(walker.index, 1, 'index');
  assert.equal(walker.nextIndex, 2, 'next index');
  assert.equal(walker.previousIndex, 0, 'previous index');
  assert.equal(walker.isFirst, false, 'isFirst');
  assert.equal(walker.isLast, false, 'isLast');

  assert.equal(walker.current, 'b', 'current check');
}

function checkEnd(assert, walker) {
  assert.equal(walker.index, 2, 'index');
  assert.equal(walker.nextIndex, undefined, 'next index');
  assert.equal(walker.previousIndex, 1, 'previous index');
  assert.equal(walker.isFirst, false, 'isFirst');
  assert.equal(walker.isLast, true, 'isLast');

  assert.equal(walker.current, 'c', 'current check');
}

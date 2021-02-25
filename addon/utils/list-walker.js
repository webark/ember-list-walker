import { computed } from '@ember/object';
import ArrayProxy from '@ember/array/proxy';

// eslint-disable-next-line ember/no-classic-classes
const ListWalker = ArrayProxy.extend({
  index: computed({
    get() {
      return 0;
    },
    set(key, value, original) {
      if (0 <= value && value < this.length) {
        return value;
      } else {
        return original;
      }
    },
  }),

  isFirst: computed('index', {
    get() {
      return this.index === 0;
    },
  }),

  isLast: computed('index', 'length', {
    get() {
      return this.index === this.length - 1;
    },
  }),

  nextIndex: computed('index', 'isLast', {
    get() {
      return this.isLast ? undefined : this.index + 1;
    },
  }),

  previousIndex: computed('index', 'isFirst', {
    get() {
      return this.isFirst ? undefined : this.index - 1;
    },
  }),

  next() {
    this.set('index', this.nextIndex);

    return this.current;
  },

  previous() {
    this.set('index', this.previousIndex);

    return this.current;
  },

  current: computed('index', {
    get() {
      return this.objectAt(this.index);
    },
  }),

  setCurrent(callback) {
    const newIndex = this.toArray().findIndex(callback);

    this.set('index', newIndex);

    return this.current;
  },
});

export function listWalker(content) {
  return ListWalker.create({ content });
}

export function walker(property) {
  return computed(property, {
    get() {
      return listWalker(this.get(property));
    },
  });
}

export default ListWalker;

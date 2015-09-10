
export default class Store {
  constructor({reducers, initialState, actions}) {
    this._reducers = reducers;
    this._state = initialState || {};
    this._callback = function(){};

    this._actions = {};
    for (var k in actions) {
      this._actions[k] = this::actions[k];
    }
  }

  get state() {
    return this._state;
  }

  get actions() {
    return this._actions;
  }

  subscribe(callback) {
    this._callback = callback;
  }

  dispatch(action) {
    var reducer = this._reducers[action.type];
    if (reducer) {
      this._state = reducer(this._state, action);
      this._callback();
    }
  }
}

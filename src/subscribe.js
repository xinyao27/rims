function createSubscribe() {
  class Subscribe {
    _subscribers = [];

    subscribe(func) {
      const subs = this._subscribers;
      if (subs.indexOf(func) < 0) {
        subs.push(func);
      }
      return () => {
        const i = subs.indexOf(func);
        if (i > -1) {
          subs.splice(i, 1);
        }
      };
    }

    publish(action, state) {
      this._subscribers.forEach(sub => sub(action, state));
    }
  }
  return new Subscribe();
}

export default createSubscribe();

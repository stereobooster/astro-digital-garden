export class Bag<T> {
  #map: Map<T, number>;

  constructor() {
    this.#map = new Map();
  }

  add(v: T) {
    const newCount = (this.#map.get(v) || 0) + 1;
    this.#map.set(v, newCount);
    return newCount;
  }

  delete(v: T) {
    if (!this.#map.has(v)) return false;
    const newCount = this.#map.get(v)! - 1;
    if (newCount <= 0) {
      this.#map.delete(v);
    } else {
      this.#map.set(v, newCount);
    }
    return true;
  }

  entries() {
    return this.#map.entries();
  }

  values() {
    return this.#map.keys();
  }
}

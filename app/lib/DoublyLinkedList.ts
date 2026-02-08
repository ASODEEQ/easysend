export class DNode<T> {
  value: T;
  prev: DNode<T> | null = null;
  next: DNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> {
  head: DNode<T> | null = null;
  tail: DNode<T> | null = null;
  length = 0;

  constructor(iterable: T[] = []) {
    for (const v of iterable) this.append(v);
  }

  append(value: T) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    this.length++;
    return node;
  }

  deleteAt(index: number) {
    if (index < 0 || index >= this.length) return null;
    let cur = this.head;
    for (let i = 0; i < index && cur; i++) cur = cur.next;
    if (!cur) return null;

    if (cur.prev) cur.prev.next = cur.next;
    if (cur.next) cur.next.prev = cur.prev;
    if (cur === this.head) this.head = cur.next;
    if (cur === this.tail) this.tail = cur.prev;

    this.length--;
    return cur.value;
  }

  toArrayForward() {
    const arr: T[] = [];
    for (let n = this.head; n; n = n.next) arr.push(n.value);
    return arr;
  }
}

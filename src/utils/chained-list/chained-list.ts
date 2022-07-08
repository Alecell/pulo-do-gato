export class ListNode<T> {
  constructor(
      public mesh: T | null,
      public next: ListNode<T> | null = null
  ) {
      this.next = null;
  }
}

export class ChainedList<T> {
  private _head: ListNode<T> | null = null
  private _last: ListNode<T> | null = null
  private _size = 0;

  constructor() {}

  get head() {
      return this._head;
  }

  get last() {
      return this._last;
  }

  
  get size() {
      return this._size;
  }

  removeFirstItem() {
      if (this._head) {
          this._head = this._head.next;
          this._size--;
      }
  }

  addItem(item: ListNode<T>) {
      if (!this.head) {
          this._head = item;
      }

      if (this.last) {
          this.last.next = item;
      }

      this._size++;
      this._last = item;
  }

  clear() {
      this._head = null;
  }
}
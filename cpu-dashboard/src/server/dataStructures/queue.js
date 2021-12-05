/**
 * Queue data structure implementing FIFO queue definition.
 */
export class Queue {
  constructor(maxLength) {
    if (!maxLength) {
      throw ('Queue minimal length is 1')
    }
    this.queue = initialValues;
  };

  /**
   * Add item to queue, adds it to the bottom of the queue
   */
  enqueue(item) {
    if (this.queue.length === maxLength) {
      this.dequeue();
    }
    this.queue.push(item);
  };

  /**
   * Remove item from queue, takes the first element on queue
   */
  dequeue() {
    this.queue.shift();
  };

  /**
   * return queue as an array
   */
  toArray() {
    return this.queue;
  };
}

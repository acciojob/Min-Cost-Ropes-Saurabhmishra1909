function mincost(arr)
{ 
//write your code here
// return the min cost
	  const minHeap = new MinHeap();

  // Insert all rope lengths into the min-heap
  for (const rope of arr) {
    minHeap.insert(rope);
  }

  let totalCost = 0;

  // Connect ropes until only one rope remains
  while (minHeap.size() > 1) {
    // Remove the two shortest ropes
    const first = minHeap.extractMin();
    const second = minHeap.extractMin();

    // Calculate the cost to connect them
    const cost = first + second;

    // Add the cost to the total
    totalCost += cost;

    // Insert the new rope back into the heap
    minHeap.insert(cost);
  }

  return totalCost;
}

// MinHeap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Insert a value into the heap
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  // Extract the minimum value from the heap
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  // Get the size of the heap
  size() {
    return this.heap.length;
  }

  // Bubble up to maintain heap property
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  // Bubble down to maintain heap property
  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
      this.bubbleDown(smallestIndex);
    }
  }
}

module.exports=mincost;

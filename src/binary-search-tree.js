const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

const getDir = (data, node) => (data < node.data ? 'left' : 'right');

class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    if (!this.base) {
      this.base = new Node(data);
      return;
    }

    let cur = this.base;

    while (true) {
      if (cur.data === data) return;
      let dir = getDir(data, cur);
      if (!cur[dir]) {
        cur[dir] = new Node(data);
        return;
      }
      cur = cur[dir];
    }
  }

  find(data) {
    let cur = this.base;
    while (cur) {
      if (cur.data === data) return cur;
      let dir = getDir(data, cur);
      cur = cur[dir];
    }
    return null;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this.base = replaceNode(this.base, data);

    function replaceNode(node, data) {
      if (!node) return null;

      if (data !== node.data) {
        let dir = getDir(data, node);
        node[dir] = replaceNode(node[dir], data);
        return node;
      }

      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let maxLeft = node.left;
      while (maxLeft.right) maxLeft = maxLeft.right;
      node.data = maxLeft.data;
      node.left = replaceNode(node.left, maxLeft.data);

      return node;
    }
  }

  findExtremum(dir) {
    if (!this.base) return null;
    let cur = this.base;
    while (cur[dir]) cur = cur[dir];
    return cur.data;
  }

  min() {
    return this.findExtremum('left');
  }

  max() {
    return this.findExtremum('right');
  }
}

module.exports = {
  BinarySearchTree,
};

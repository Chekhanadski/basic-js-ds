const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = this._add(this._root, data);
  }

  _add(root, data) {
    if (root === null) {
      return new Node(data);
    }

    if (data < root.data) {
      root.left = this._add(root.left, data);
    } else if (data > root.data) {
      root.right = this._add(root.right, data);
    }

    return root;
  }

  has(data) {
    return this._find(this._root, data) !== null;
  }

  find(data) {
    let result = this._find(this._root, data);
    return result ? result : null;
  }

  _find(root, data) {
    if (root === null || root.data === data) {
      return root;
    }

    if (data < root.data) {
      return this._find(root.left, data);
    } else {
      return this._find(root.right, data);
    }
  }

  remove(data) {
    const nodeRemoved = this._removeNode(this._root, data);
    if (nodeRemoved !== null) {
      this._root = nodeRemoved;
      return true;
    }
    return false;
  }

  _removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this._removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this._removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this._removeNode(node.right, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  min() {
    return this._min(this._root);
  }

  max() {
    return this._max(this._root);
  }

  _min(root) {
    if (root === null) {
      return null;
    }
    while (root.left !== null) {
      root = root.left;
    }
    return root.data;
  }

  _max(root) {
    if (root === null) {
      return null;
    }
    while (root.right !== null) {
      root = root.right;
    }
    return root.data;
  }
}

module.exports = {
  BinarySearchTree,
};

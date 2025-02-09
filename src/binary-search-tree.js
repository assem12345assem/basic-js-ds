const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree extends Node {
  constructor() {
    super(null);
  }

  root() {
    if (this.data === null) return null;
    return this;
  }

  add(data) {
    if (data === null) return;
    const addNode = (node, data) => {
      if (!node.data) {
        node.data = data;
        return;
      }
      if (data === node.data) return;
      if (data > node.data) {
        if (node.right) addNode(node.right, data);
        else node.right = new Node(data);
      } else {
        if (node.left) addNode(node.left, data);
        else node.left = new Node(data);
      }
    };

    addNode(this, data);
  }

  has(data) {
    if (data === null) return false;

    const hasNode = (node, data) => {
      if (node === null || node.data === null) return false;
      if (data === node.data) return true;
      if (data > node.data) return hasNode(node.right, data);
      else return hasNode(node.left, data);
    };

    return hasNode(this, data);
  }

  find(data) {
    if (data === null) return null;
    const findNode = (node, data) => {
      if (node === null || node.data === null) return null;
      if (data === node.data) return node;
      if (data > node.data) return findNode(node.right, data);
      else return findNode(node.left, data);
    };
    return findNode(this, data);
  }

  remove(data) {
    if (data === null) return;
    const removeNode = (node, data) => {
      if (node === null || node.data === null) return;
      if (data === node.data) {
        let rightCopy = node.right;
        let leftCopy = node.left;

        node.right = null;
        node.left = null;
        node.data = null;

        const putNodesBack = (node) => {
          if (node === null || node.data === null) return;
          this.add(node.data);
          putNodesBack(node.left);
          putNodesBack(node.right);
        }

        putNodesBack(rightCopy);
        putNodesBack(leftCopy);

        return;
      }

      if (data > node.data) removeNode(node.right, data);
      else removeNode(node.left, data);
    };

    removeNode(this, data);
  }

  min() {
    let temp = this;
    while( temp.left != null ) temp = temp.left;
    return temp.data;
  }

  max() {
    let temp = this;
    while( temp.right != null ) temp = temp.right;
    return temp.data;
  }
}


module.exports = {
  BinarySearchTree
};
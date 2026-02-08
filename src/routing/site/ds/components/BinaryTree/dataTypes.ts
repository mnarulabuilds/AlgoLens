class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  find(value) {
    return this.findNode(this.root, value)
  }

  findNode(node, value) {
    if (node === null) {
      return null
    }
    if (value < node.value) {
      return this.findNode(node.left, value)
    } else if (value > node.value) {
      return this.findNode(node.right, value)
    } else {
      return node
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value)
  }

  deleteNode(node, value) {
    if (node === null) {
      return null
    }
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value)
      return node
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value)
      return node
    } else {
      if (node.left === null && node.right === null) {
        return null
      }
      if (node.left === null) {
        return node.right
      }
      if (node.right === null) {
        return node.left
      }

      const minValueNode = this.findMinNode(node.right)
      node.value = minValueNode.value
      node.right = this.deleteNode(node.right, minValueNode.value)
      return node
    }
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }

  clone() {
    const newTree = new BinaryTree()
    newTree.root = this.cloneNode(this.root)
    return newTree
  }

  cloneNode(node) {
    if (node === null) {
      return null
    }
    const newNode = new TreeNode(node.value)
    newNode.left = this.cloneNode(node.left)
    newNode.right = this.cloneNode(node.right)
    return newNode
  }
}

export { TreeNode, BinaryTree }

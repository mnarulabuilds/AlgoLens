class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let node = this.root
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isEndOfWord = true
  }

  search(word) {
    let node = this.root
    const path = []
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        return { found: false, path }
      }
      path.push(char)
      node = node.children[char]
    }
    return { found: node.isEndOfWord, path }
  }

  startsWith(prefix) {
    let node = this.root
    const path = []
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return { found: false, path }
      }
      path.push(char)
      node = node.children[char]
    }
    return { found: true, path }
  }

  delete(word) {
    this.deleteHelper(this.root, word.toLowerCase(), 0)
  }

  deleteHelper(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false
      }
      node.isEndOfWord = false
      return Object.keys(node.children).length === 0
    }

    const char = word[index]
    const childNode = node.children[char]

    if (!childNode) {
      return false
    }

    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1)

    if (shouldDeleteChild) {
      delete node.children[char]
      return Object.keys(node.children).length === 0 && !node.isEndOfWord
    }

    return false
  }

  getAllWords() {
    const words = []
    this.collectWords(this.root, "", words)
    return words
  }

  collectWords(node, prefix, words) {
    if (node.isEndOfWord) {
      words.push(prefix)
    }

    for (let char in node.children) {
      this.collectWords(node.children[char], prefix + char, words)
    }
  }

  clone() {
    const newTrie = new Trie()
    newTrie.root = this.cloneNode(this.root)
    return newTrie
  }

  cloneNode(node) {
    if (!node) return null
    const newNode = new TrieNode()
    newNode.isEndOfWord = node.isEndOfWord
    for (let char in node.children) {
      newNode.children[char] = this.cloneNode(node.children[char])
    }
    return newNode
  }
}

export { TrieNode, Trie }

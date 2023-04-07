/*
  4.2

  Write and alorithm to create a minimal height binary search tree.

  Input) A sorted array of integers
  Output) Return a minimal height Binary Search Tree
*/

const { TreeNode } = require('../structures/TreeNode.js')
const assert = require('node:assert')

/**
 *
 * @param {number[]} intArray
 * @param {number} start
 * @param {number} end
 */
function createMinimalBST(intArray, start, end) {
  if (end < start) {
    return null
  }

  let mid = (start + end) / 2
  let nodeN = new TreeNode(intArray[mid])
  nodeN.left = createMinimalBST(intArray, start, mid - 1)
  nodeN.right = createMinimalBST(intArray, mid + 1, end)
  return nodeN
}

/**
 *
 * @param {number[]} array
 * @returns
 */
function algorithm(array) {
  return createMinimalBST(array, 0, array.length - 1)
}

function test() {
  const array = [1, 2, 3, 4, 5, 6, 7]

  // Expected left side of the tree
  const leftNode = new TreeNode(2)
  leftNode.left = new TreeNode(1)
  leftNode.right = new TreeNode(3)

  // Expected root of the tree
  const rootNode = new TreeNode(4)

  // Expected right side of the tree
  const rightNode = new TreeNode(6)
  rightNode.left = new TreeNode(5)
  rightNode.right = new TreeNode(7)

  // Attached the branches to the root node
  rootNode.left = leftNode
  rootNode.right = rightNode

  const expectedStringValue = JSON.stringify(rootNode)

  const result = algorithm(array)
  assert.equal(JSON.stringify(result), expectedStringValue)
}
test()

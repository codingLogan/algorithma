const assert = require('node:assert')
const LinkedList = require('./LinkedList.js')

function algorithm(numberOne, numberTwo) {
  const newList = new LinkedList()

  let c1 = numberOne.head
  let c2 = numberTwo.head
  let remainder = 0

  // Continue iterating through both lists until no numbers are left
  while (c1 !== null || c2 !== null || remainder === 1) {
    // Manage c1
    let n1 = 0
    if (c1 !== null) {
      n1 = c1.value
    }

    // Manage c2
    let n2 = 0
    if (c2 !== null) {
      n2 = c2.value
    }

    const result = n1 + n2 + remainder
    remainder = result > 9 ? 1 : 0
    const resultNumber = result % 10
    newList.push(resultNumber)

    c1 = c1.next ? c1.next : null
    c2 = c2.next ? c2.next : null
  }

  return newList
}

function test() {
  const numberOne = new LinkedList()
  numberOne.push(7) // Ones
  numberOne.push(1) // Tens
  numberOne.push(6) // Hundreds

  const numberTwo = new LinkedList()
  numberTwo.push(5) // Ones
  numberTwo.push(9) // Tens
  numberTwo.push(2) // Hundreds

  const resultList = algorithm(numberOne, numberTwo)
  console.log(resultList.toString())
  assert.equal.toString(resultList.toString(), '2 1 9')
}

test()

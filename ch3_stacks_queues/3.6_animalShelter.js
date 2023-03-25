const assert = require('node:assert')
const LinkedList = require('../ch2_linked_lists/LinkedList.js')

const types = {
  DOG: 'dog',
  CAT: 'cat',
}

class AnimalShelterFIFO {
  constructor() {
    this.cats = new LinkedList()
    this.dogs = new LinkedList()
    this.order = 1
  }

  receive(type) {
    const animal = new Animal(type, this.order++)
    if (type === types.DOG) {
      this.dogs.push(animal)
    } else {
      this.cats.push(animal)
    }
  }

  adopt() {
    // Handle empty lists
    if (this.cats.head === null && this.dogs.head === null) {
      throw new Error('no animal to adopt!')
    } else if (this.cats.head === null) {
      return this.dogs.pop()
    } else if (this.dogs.head === null) {
      return this.cats.pop()
    }

    // When both lists have animals
    if (this.cats.head.value.order > this.dogs.head.value.order) {
      return this.dogs.pop()
    } else {
      return this.cats.pop()
    }
  }

  adoptOldestType(list) {
    if (list.head === null) {
      throw new Error('no animal to adopt!')
    }

    return list.pop()
  }

  adoptDog() {
    return this.adoptOldestType(this.dogs)
  }

  adoptCat() {
    return this.adoptOldestType(this.cats)
  }
}

class Animal {
  constructor(type, order) {
    this.type = type
    this.order = order
  }
}

function test() {
  const shelter = new AnimalShelterFIFO()
  assert.equal(shelter.cats.head, null)

  shelter.receive(types.DOG)
  assert.equal(shelter.adopt().type, types.DOG)
}
test()

function catIsoldestTest() {
  const shelter = new AnimalShelterFIFO()

  shelter.receive(types.CAT)
  shelter.receive(types.DOG)
  shelter.receive(types.CAT)
  shelter.receive(types.DOG)
  assert.equal(shelter.adopt().type, types.CAT)
}
catIsoldestTest()

function adoptDogTest() {
  const shelter = new AnimalShelterFIFO()

  shelter.receive(types.CAT)
  shelter.receive(types.DOG) // order = 2
  shelter.receive(types.CAT)
  shelter.receive(types.DOG)

  const { type, order } = shelter.adoptDog()
  assert.equal(type, types.DOG)
  assert.equal(order, 2)
}
adoptDogTest()

function adoptCatTest() {
  const shelter = new AnimalShelterFIFO()

  shelter.receive(types.CAT) // order = 1
  shelter.receive(types.DOG) // order = 2
  shelter.receive(types.CAT)
  shelter.receive(types.DOG)

  const { type, order } = shelter.adoptCat()
  assert.equal(type, types.CAT)
  assert.equal(order, 1)
}
adoptCatTest()

const assert = require("node:assert");

function printMatrix(matrix) {
  console.log("=== matrix ===");
  matrix.forEach((row) => {
    console.log(row);
  });
}

function createEmptyMatrix(size) {
  const matrix = new Array(size).fill(0);

  matrix.forEach((row, index) => {
    matrix[index] = new Array(size).fill(0);
  });

  return matrix;
}

function rotateMatrix(matrix) {
  const newMatrix = createEmptyMatrix(matrix.length);

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < matrix.length; columnIndex++) {
      const valueRow = matrix.length - 1 - columnIndex;
      newMatrix[rowIndex][columnIndex] = matrix[valueRow][rowIndex];
    }
  }

  return newMatrix;
}

function test() {
  assert.deepEqual(
    rotateMatrix([
      [1, 1, 2, 3, 3],
      [1, 1, 2, 3, 3],
      [8, 8, 0, 4, 4],
      [7, 7, 6, 5, 5],
      [7, 7, 6, 5, 5],
    ]),
    [
      [7, 7, 8, 1, 1],
      [7, 7, 8, 1, 1],
      [6, 6, 0, 2, 2],
      [5, 5, 4, 3, 3],
      [5, 5, 4, 3, 3],
    ]
  );

  assert.deepEqual(
    rotateMatrix([
      [1, 2, 3],
      [8, 0, 4],
      [7, 6, 5],
    ]),
    [
      [7, 8, 1],
      [6, 0, 2],
      [5, 4, 3],
    ]
  );
}

test();

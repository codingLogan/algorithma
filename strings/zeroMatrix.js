const assert = require("node:assert");

function zeroMatrix(matrix) {
  // Store index that are found
  const rowsWithZero = new Array(matrix.length).fill(false);
  const columnsWithZero = new Array(matrix[0].length).fill(false);

  // Find the points with 0 value
  matrix.forEach((row, rowIndex) => {
    row.forEach((matrixValue, columnIndex) => {
      if (matrixValue == 0) {
        rowsWithZero[rowIndex] = true;
        columnsWithZero[columnIndex] = true;
      }
    });
  });

  // Use the points to modify the matrix
  matrix.forEach((row, rowIndex) => {
    row.forEach((matrixValue, columnIndex) => {
      if (rowsWithZero[rowIndex] || columnsWithZero[columnIndex]) {
        matrix[rowIndex][columnIndex] = 0;
      }
    });
  });

  // Implement zeroMatrix
  return matrix;
}

function test() {
  assert.deepEqual(
    zeroMatrix([
      [1, 2, 3],
      [4, 0, 6],
      [7, 8, 9],
    ]),
    [
      [1, 0, 3],
      [0, 0, 0],
      [7, 0, 9],
    ]
  );

  assert.deepEqual(
    zeroMatrix([
      [1, 2, 3, 4, 5, 6],
      [4, 0, 6, 1, 1, 1],
      [7, 8, 9, 1, 0, 1],
      [7, 8, 9, 1, 1, 1],
    ]),
    [
      [1, 0, 3, 4, 0, 6],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [7, 0, 9, 1, 0, 1],
    ]
  );
}

test();

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

function rotateInPlace(matrix) {
  // Current value should move to this column
  const getNextColIndex = (rowIndex, length) => {
    return length - (rowIndex + 1);
  };

  const setNextLocationValue = (currentRowIndex, currentColumnIndex, value) => {
    matrix[currentColumnIndex][
      getNextColIndex(currentRowIndex, matrix.length)
    ] = value;
  };

  const readNextLocation = (currentRowIndex, currentColumnIndex) => {
    return matrix[currentColumnIndex][
      getNextColIndex(currentRowIndex, matrix.length)
    ];
  };

  const maxColumn = Math.ceil(matrix.length / 2);
  const maxRow = Math.floor(matrix.length / 2);

  // Iterate over a subset of the rows
  for (let rowIndex = 0; rowIndex < maxRow; rowIndex++) {
    for (let columnIndex = 0; columnIndex < maxColumn; columnIndex++) {
      let currentRow = rowIndex;
      let currentColumn = columnIndex;
      let newLocationOldValue;

      // Rotate values 360deg, which means 4 rotations
      for (let rotation = 0; rotation < 4; rotation++) {
        // Store old value
        const tempValue = readNextLocation(currentRow, currentColumn);
        setNextLocationValue(currentRow, currentColumn, newLocationOldValue);
        newLocationOldValue = tempValue;

        // Change our current coordinate
        const oldColumn = currentColumn;
        currentColumn = getNextColIndex(currentRow, matrix.length);
        currentRow = oldColumn;
      }

      setNextLocationValue(currentRow, currentColumn, newLocationOldValue);
    }
  }

  return matrix;
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
    rotateInPlace([
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

  assert.deepEqual(
    rotateInPlace([
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

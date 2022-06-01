const assert = require("node:assert");

// Test the algorithm expects
function test() {
  const goodValues = ["abcdefg", "123qweasd", "12345qwert"];

  goodValues.forEach((goodValue) => {
    assert.equal(uniqueString(goodValue), true, "Value should be unique");
  });

  const badValues = ["1234asdd", "112345abc", "12345aa67890"];
  badValues.forEach((badValue) => {
    assert.equal(
      uniqueString(badValue),
      false,
      "Value is expected to not be unique"
    );
  });
}

// Implement the algorithm
function uniqueString(testableString) {
  // Break early conditions
  // Optimization: How many characters are in the set?
  const ASCII_CHARACTERS = 128; // 7 bits of characters 2^7
  if (testableString.length > ASCII_CHARACTERS) {
    return false;
  }

  const usedCharacters = {};

  // If a character has already been used, it's not unique
  for (let i = 0; i < testableString.length; i++) {
    const characterToCheck = testableString[i];
    if (Object.keys(usedCharacters).includes(characterToCheck)) {
      return false;
    }

    usedCharacters[characterToCheck] = true;
  }

  return true;
}

test();

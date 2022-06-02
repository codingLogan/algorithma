const assert = require("node:assert");

/**
 * @description A test function that checks a string
 * and determines if all characters are unique.
 *
 * @returns {boolean} true if all characters are unique
 */
function stringHasUniqueCharacters(testableString) {
  /**
   * Optimizations
   *
   * Character set length can help short circuit long
   * strings.  If more characters are in the string
   * than are in the set there will be duplicates.
   *
   * ASCII = 128
   * Extended ASCII = 256
   * UTF-8 = (lots of characters)
   */
  const ASCII_CHARACTERS = 128;
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

function test() {
  const goodValues = ["abcdefg", "123qweasd", "12345qwert"];

  goodValues.forEach((goodValue) => {
    assert.equal(
      stringHasUniqueCharacters(goodValue),
      true,
      "Characters should be unique"
    );
  });

  const badValues = ["1234asdd", "112345abc", "12345aa67890"];
  badValues.forEach((badValue) => {
    assert.equal(
      stringHasUniqueCharacters(badValue),
      false,
      "Duplicate characters have been found"
    );
  });
}

test();

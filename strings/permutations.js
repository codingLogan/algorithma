const assert = require("node:assert");

/**
 * Idea #1
 *
 * Make a map of character frequency (storage considerations?)
 * Loop over the strings and add 1 to the frequency
 * Loop over the other string and decrement
 *
 * All values of the array should be 0 afterward
 */
function arrayMapImplementation(testableString, permutationString) {
  const characterFrequencyMap = {};

  // Increment to gather the frequency
  testableString.split("").forEach((character) => {
    if (!characterFrequencyMap[character]) {
      characterFrequencyMap[character] = 0;
    }

    characterFrequencyMap[character] += 1;
  });

  // Decrement to determine if character frequency matches
  const permutationArray = permutationString.split("");
  for (let i = 0; i < permutationArray.length; i++) {
    const permutationCharacter = permutationArray[i];

    // See if the permutationCharacter in the map, if not we don't have a permutation
    // If it's already zero we don't have a permutation
    if (
      characterFrequencyMap[permutationCharacter] === "undefined" ||
      characterFrequencyMap[permutationCharacter] === 0
    ) {
      return false;
    }

    characterFrequencyMap[permutationCharacter] -= 1;
  }

  return true;
}

/**
 * Idea #2
 *
 * Sort characters of both strings (time considerations)
 * Loop over the strings and if they don't match, return false
 */
function sortedStringsImplementation(testableString, permutationString) {
  const sortedString = testableString.split("");
  const sortedPermutation = permutationString.split("");
  sortedString.sort();
  sortedPermutation.sort();

  if (sortedString.join("") == sortedPermutation.join("")) {
    return true;
  }

  return false;
}

/**
 * @description Checks if a given string is a permutation
 * of another given string.
 *
 * Ex: "ball" and "blla" are permutations
 *
 * @returns {boolean} true if string is a permutation
 */
function stringIsPermutation(testableString, permutationString, testFunction) {
  // Are the character lengths the same?
  if (testableString.length !== permutationString.length) {
    return false;
  }

  return testFunction(testableString, permutationString);
}

function test() {
  assert.equal(
    stringIsPermutation("ball", "blla", arrayMapImplementation),
    true,
    "Should be a permutation"
  );

  assert.equal(
    stringIsPermutation("ball", "blla", sortedStringsImplementation),
    true,
    "Should be a permutation"
  );
}

test();

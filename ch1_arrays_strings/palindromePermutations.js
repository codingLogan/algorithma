const assert = require("node:assert");

/**
 * @description Check if the string is a permutation of a palindrome
 * - Palindrome is a word or phrase that is the same forward and backward
 * - Permutation is a rearrangement of the letters
 * - No "real" words are necessary
 * - Ignore non-letter characters (like spaces)
 * - Case insensitive
 * @returns boolean - true if it is a permutation of a palindrome
 */
function isPalindromePermutation(givenString) {
  // Implement isPalindromePermutation

  /**
   * Notes
   *
   * Information about known palindromes
   * tacocat
   * - Even numbers of characters (interesting)
   * - Only one character can have an odd count (very useful)
   */

  /**
   * Idea #1
   *
   * Remove (or ignore) all non-alpha characters
   * Sort characters
   * Iterate through the string
   * If there is more than 1 character with a single count, it's not a palindrome
   */
  const stringArray = givenString.replace(/[^a-z]/gi, "").split("");
  stringArray.sort((a, b) => {
    if (a.toLowerCase() === b.toLowerCase()) {
      return 0;
    }

    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });

  let oddCharacterAvailable = true;
  let currentCharacter = "";
  let currentCharacterCount = 0;

  for (let stringIndex = 0; stringIndex < stringArray.length; stringIndex++) {
    if (
      currentCharacter.toLowerCase() !== stringArray[stringIndex].toLowerCase()
    ) {
      // Handle logic for switching to a new character
      // If an odd amount was counted for the previous character
      if (currentCharacterCount % 2 !== 0) {
        // If an odd character was already found, this isn't a palindrome
        if (!oddCharacterAvailable) {
          return false;
        }

        // Only one odd character is allowed, don't allow another
        oddCharacterAvailable = false;
      }

      // Reset the counter
      currentCharacter = stringArray[stringIndex];
      currentCharacterCount = 0;
    }

    currentCharacterCount += 1;
  }

  // Final check for if the last character is odd
  if (!oddCharacterAvailable && currentCharacterCount % 2 !== 0) {
    return false;
  }

  return true;
}

function isPalindromePermutationNoSort(givenString) {
  const canIgnoreCharacter = (character) => {
    return /[^a-z]/i.test(character);
  };

  const addOneToCharacter = (character, characterMap) => {
    const lowerCaseCharacter = character.toLowerCase();
    if (typeof characterMap[lowerCaseCharacter] === "undefined") {
      characterMap[lowerCaseCharacter] = 0;
    }

    // Count how many times each lowerCaseCharacter is used
    characterMap[lowerCaseCharacter] += 1;
  };

  const containsValidOddCount = (characterMap) => {
    let oddAvailable = true;
    for (const character in characterMap) {
      if (characterMap[character] % 2 === 1) {
        if (oddAvailable) {
          oddAvailable = false;
        } else {
          return false;
        }
      }
    }

    return true;
  };

  const characterMap = {};

  for (let stringIndex = 0; stringIndex < givenString.length; stringIndex++) {
    if (canIgnoreCharacter(givenString[stringIndex])) {
      continue;
    }

    addOneToCharacter(givenString[stringIndex], characterMap);
  }

  return containsValidOddCount(characterMap);
}

function useBitVectorCheck(givenString) {
  const FIRST_LETTER_CHARACTER = "a".charCodeAt(0);

  const canIgnoreCharacter = (character) => {
    return /[^a-z]/i.test(character);
  };

  /**
   *
   * @param {string} character expects to be a single character
   * @returns index value from 0 - 25
   */
  const mapCharacterToVector = (character) => {
    return character.charCodeAt(0) - FIRST_LETTER_CHARACTER;
  };

  /**
   *
   * @param {number} vector current number vector
   * @param {number} index bit position that should be toggled
   * @returns
   */
  const toggleVectorBit = (vector, index) => {
    // Move a 1 into the correct place of the number
    // ex: 1 << 3 is a binary 100
    const mask = 1 << index;
    return mask ^ vector;
  };

  /**
   * 0 bits are even
   * 1 bits are odd
   * @returns true if at most 1 bit is a 1
   */
  const hasOnlyOneOddBit = (vector) => {
    return (vector & (vector - 1)) === 0;
  };

  const isStringPalindrome = (givenString) => {
    let vector = 0;
    for (let charIndex = 0; charIndex < givenString.length; charIndex++) {
      if (canIgnoreCharacter(givenString[charIndex])) {
        continue;
      }

      const character = givenString[charIndex];
      vector = toggleVectorBit(
        vector,
        mapCharacterToVector(character.toLowerCase())
      );
    }

    return hasOnlyOneOddBit(vector);
  };

  return isStringPalindrome(givenString);
}

function test() {
  // One palindrome is "tacocat" so it returns true
  assert.equal(isPalindromePermutation("Tact Coa"), true);
  assert.equal(isPalindromePermutationNoSort("Tact Coa"), true);
  assert.equal(useBitVectorCheck("Tact Coa"), true);

  // An even based palindrome with extra characters
  assert.equal(isPalindromePermutation("aa bb cc 1 2 dd ee"), true);
  assert.equal(isPalindromePermutationNoSort("aa bb cc 1 2 dd ee"), true);
  assert.equal(useBitVectorCheck("aa bb cc 1 2 dd ee"), true);

  // A non palindrome
  assert.equal(isPalindromePermutation("abcdefgyzgfedcba"), false);
  assert.equal(isPalindromePermutationNoSort("abcdefgyzgfedcba"), false);
  assert.equal(useBitVectorCheck("abcdefgyzgfedcba"), false);
}

test();

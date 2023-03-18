const assert = require("node:assert");

/**
 *
 * @param {string} string1
 * @param {string} string2
 * @returns true if there a maximum of 1 change between the two strings
 */
function oneAway(string1, string2) {
  // If the strings are equal
  if (string1 === string2) {
    return true;
  }

  // If the difference is more than 1 it can't be 1 away
  if (Math.abs(string1.length - string2.length) > 1) {
    return false;
  }

  // Determine which string is longer
  let diffWasFound = false;
  let longerString = string1;
  let shorterString = string2;
  if (string1.length < string2.length) {
    longerString = string2;
    shorterString = string1;
  }

  let shorterIdx = 0;
  for (let longerIdx = 0; longerIdx < longerString.length; longerIdx++) {
    if (longerString[longerIdx] !== shorterString[shorterIdx]) {
      // When a second diff is found return false immediately
      if (diffWasFound) {
        return false;
      } else {
        diffWasFound = true;
      }

      if (string1.length !== string2.length) {
        continue;
      }
    }

    shorterIdx++;
  }

  return true;
}

function test() {
  // Same length tests
  assert.equal(oneAway("pale", "pale"), true);
  assert.equal(oneAway("pale", "bale"), true);
  assert.equal(oneAway("pat", "par"), true);
  assert.equal(oneAway("pale", "ball"), false);
  assert.equal(oneAway("pale", "bake"), false);

  // One size difference
  assert.equal(oneAway("pale", "ple"), true);
  assert.equal(oneAway("pales", "pale"), true);
  assert.equal(oneAway("pale", "pales"), true);
  assert.equal(oneAway("pale", "pakes"), false);
  assert.equal(oneAway("pale", "spale"), true);

  // Length is too different
  assert.equal(oneAway("pal", "pales"), false);
}

test();

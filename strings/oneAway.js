const assert = require("node:assert");

/**
 *
 * @param {string} string1
 * @param {string} string2
 * @returns
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

  // If they are the same compare until a difference is found
  if (string1.length === string2.length) {
    let diffAtIndex = null;

    for (let i = 0; i < string1.length; i++) {
      // iterate until a difference is found
      if (string1[i] !== string2[i]) {
        diffAtIndex = i;
        break;
      }
    }

    // If the diff is the last character return true
    if (diffAtIndex + 1 === string1.length) {
      return true;
    }

    // If the substrings past the difference are equal it's 1 away
    return (
      string1.substring(diffAtIndex + 1) === string2.substring(diffAtIndex + 1)
    );
  }

  // If the strings are 1 difference in length
  if (Math.abs(string1.length - string2.length) == 1) {
    // Determine which string is longer
    let longerString = null;
    let shorterString = null;

    if (string1.length > string2.length) {
      longerString = string1;
      shorterString = string2;
    } else {
      longerString = string2;
      shorterString = string1;
    }

    // Iterate until a difference is found
    let diffAtIndex = null;
    for (let i = 0; i < shorterString.length; i++) {
      if (shorterString[i] !== longerString[i]) {
        diffAtIndex = i;
        break;
      }
    }

    // The last character on the longer string is the difference
    if (diffAtIndex === null) {
      return true;
    }

    // Move the longer string's pointer over and compare substrings
    return (
      longerString.substring(diffAtIndex + 1) ===
      shorterString.substring(diffAtIndex)
    );
  }

  throw "unhandled difference";
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

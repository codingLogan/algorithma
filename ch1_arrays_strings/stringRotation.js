const assert = require("node:assert");

function compareWithStartingIndex(s1, s2, s2Index) {
  let currentS2Index = s2Index;
  // Check all characters of the 2 strings
  // Rotate the index value of s2 when necessary
  for (let s1Index = 0; s1Index < s1.length; s1Index++) {
    let s1Character = s1[s1Index];
    if (s2[currentS2Index] != s1Character) {
      return false;
    }

    currentS2Index++;

    if (currentS2Index == s2.length) {
      currentS2Index = 0;
    }
  }

  return true;
}

/**
 *
 * @param {string} s1 master string
 * @param {string} s2 potential rotation of s1
 * @returns true is s2 is a rotation of s1
 */
function isRotation(s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }

  // TODO: might be worth checking if this is a permutation first

  // Check s2 against s1 for every potential starting point
  for (let s2Index = 0; s2Index < s2.length; s2Index++) {
    const s2Character = s2[s2Index];
    // If the current s2 index is used, can we find all of s1?
    if (compareWithStartingIndex(s1, s2, s2Index)) {
      return true;
    }
  }

  return false;
}

function test() {
  assert.equal(isRotation("blob", "bblo"), true);
  assert.equal(isRotation("bbbob", "bbobb"), true);
  assert.equal(isRotation("waterbottle", "bottlewater"), true);

  // One letter doesn't match
  assert.equal(isRotation("waterbottle", "bottlezater"), false);
}

function pieceTest() {
  assert.equal(compareWithStartingIndex("blob", "bblo", 0), false);
  assert.equal(compareWithStartingIndex("blob", "bblo", 1), true);
}

test();
pieceTest();

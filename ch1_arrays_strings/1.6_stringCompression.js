const assert = require("node:assert");

function compression(givenString) {
  const OUT_OF_BOUNDS = givenString.length;
  const stringBuilder = [];
  let count = 0;

  for (let index = 0; index < givenString.length; index++) {
    count++;
    const currentCharacter = givenString[index];
    const nextCharacter = givenString[index + 1];

    // If the character changes, or the last character has been reached
    if (currentCharacter !== nextCharacter || index + 1 === OUT_OF_BOUNDS) {
      stringBuilder.push(currentCharacter);
      stringBuilder.push(count);
      count = 0;
    }
  }

  if (stringBuilder.length > givenString.length) {
    return givenString;
  } else {
    return stringBuilder.join("");
  }
}

function test() {
  assert.equal(compression("aaaaaaaa"), "a8");
  assert.equal(compression("aaaaaaab"), "a7b1");
  assert.equal(compression("abbcccdddd"), "a1b2c3d4");
  assert.equal(compression("abcd"), "abcd");
}

test();

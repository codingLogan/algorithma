const assert = require("node:assert");

function compression(givenString) {
  const stringBuilder = [];
  let currentCharacter = null;
  let count = 0;

  for (let index = 0; index < givenString.length; index++) {
    const character = givenString[index];

    // Handle first character
    if (currentCharacter === null) {
      currentCharacter = character;
    }

    // Handle all middle characters
    if (currentCharacter !== character) {
      stringBuilder.push(currentCharacter);
      stringBuilder.push(count);

      currentCharacter = character;
      count = 0;
    }

    count++;

    // Handle final character
    if (index + 1 === givenString.length) {
      stringBuilder.push(character);
      stringBuilder.push(count);
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

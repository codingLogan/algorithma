const assert = require("node:assert");

/**
 * @description Given a string and its true length, return a urlified string
 *   - Edit the string in place
 *   - Replace spaces with %20
 *   - Assume the string is already long enough for the replacements characters
 * @param {string} rawString String that should be urlified
 * @param {number} trueLength The length of the actual string, minus ending spaces
 * @returns urlString
 */
function urlify(rawString, trueLength) {
  // Treat the string like an array, edit it in place

  // Idea #1 Iterate through the string - forwards
  // If you start at the front, you may end up overwriting characters you need.
  // To make it work you could store a few characters in variables, but it might get busy
  // "[s]tart here"
  // "s[t]art here"
  // "st[a]rt here"
  // "sta[r]t here"
  // "star[t] here"
  // "start[%20]re" << now we've overwritten the [he] that we needed

  // Idea #2 Iterate through the string - backwards (start writing the new string where the spaces are)
  // If you start from where the extra spaces are you get some "wiggle room" to build the string
  // Using this strategy you also only have to loop through the string 1 time
  // "start her[e]  "    // "start here [e]"
  // "start he[r]e  "    // "start here[r]e"
  // "start h[e]re  "    // "start her[e]re"
  // "start [h]ere  "    // "start he[h]ere"
  // "start[ ]here  "    // "start[%20]here"
  // "star[t] here  "    // "star[t]%20here"
  // No more spaces, we're done

  const urlCharacters = rawString.split("");

  // Start reading where the real string ends
  let readingIndex = trueLength - 1;

  // Start writing at the end of the array
  for (
    let writingIndex = urlCharacters.length - 1;
    writingIndex > 0;
    writingIndex--
  ) {
    // Determine which character to write
    if (urlCharacters[readingIndex] !== " ") {
      urlCharacters[writingIndex] = urlCharacters[readingIndex];
    } else {
      urlCharacters[writingIndex] = "0";
      urlCharacters[writingIndex - 1] = "2";
      urlCharacters[writingIndex - 2] = "%";
      writingIndex -= 2;
    }

    readingIndex--;
  }

  return urlCharacters.join("");
}

function test() {
  assert.equal(urlify("Start Here  ", 10), "Start%20Here");
  assert.equal(
    urlify("Make this a url string        ", 22),
    "Make%20this%20a%20url%20string"
  );
}

test();

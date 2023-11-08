const originalText = document.getElementById("original");
const wordsToScramble = document.getElementById("words");

document.getElementById("scrambleForm").addEventListener("submit", (e) => {
  e.preventDefault();
  scrambleFunction();
});

const scrambleFunction = () => {
  let scrambledTextContainer = document.getElementById("scrambledTextContainer");
  let scrambleOptionValue = document.getElementById("choice").value;
  let originalTextValue = originalText.value;
  let textError = document.getElementById("textError");
  let wordError = document.getElementById("wordError");

  // gets the words and turn them into strings
  // trim whitespaces using map()
  const wordsToScrambleValue = wordsToScramble.value
    .split(/[;,|]/)
    .map((e) => e.trim());

  let scramble = originalTextValue;

  // change the original words into strings
  let scrambleWords = scramble.split(/[" ";,|]/);

  // check if word is more than a word
  if (!scramble || scrambleWords.length <= 1) {
    textError.innerText = "Text should be more than 1";
    setTimeout(() => {
      textError.innerText = "";
    }, 2000);
  } else {
    if (wordsToScrambleValue) {
      // iterates through the word
      wordsToScrambleValue.forEach((word) => {
        // check if the word is in the original words and replace anyone found
        if (scramble.includes(word)) {
          let regexText = new RegExp(word, "gi");
          scramble = scramble.replace(regexText, scrambleOptionValue);
          scrambledTextContainer.innerHTML = `
      <p id="scrambledText">
      <button class="copy-icon" id="copier">&#128203;</button>
      <span class="copy-message" id="copyMessage">Click to copy</span>
      ${scramble}</p>
      `;
        } else {
          if (word.length > 1) {
            let words = word.split(",")
            wordError.innerText += `${words} is not found `;

            return;
          } else {
            wordError.innerText = `${word} is not found`;
            return;
          }
        }
        setTimeout(() => {
          wordError.innerText = "";
        }, 2000);
      });

      // check the scrambled words and let the user copy it by double clicking in the container
      if (scramble) {
        const copier = document.getElementById("copier");
        const copyMessage = document.getElementById("copyMessage");
        copier.addEventListener("mouseover", () => {
          copyMessage.style.display = "block";
        });
        copier.addEventListener("mouseout", () => {
          copyMessage.style.display = "none";
        });
        copier.addEventListener("click", () => {
          navigator.clipboard.writeText(scramble);
          alert("Copied!");
        });
      }
    } else {
      wordError.innerText = `Words to be blurred out is empty`;
      setTimeout(() => {
        wordError.innerText = "";
      }, 2000);
    }
  }
};

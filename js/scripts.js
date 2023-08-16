const wordElement = document.getElementById('word');
const regexLetters = /[a-zñ]/;

let secret = 'Monster mango loco';
const guessedLetters = [];

const writeWord = () => {
  wordElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const letter of secret.toLowerCase()) {
    const newSpan = document.createElement('span');
    if (letter === ' ') newSpan.textContent = ' ';
    else if (guessedLetters.includes(letter)) newSpan.textContent = letter.toUpperCase();
    else newSpan.textContent = '_';
    fragment.append(newSpan);
  }

  wordElement.append(fragment);
};

const checkLetterInKeyboard = letter => {
  const letterToCheck = document.querySelector(`[data-key='${letter}']`);
  if (guessedLetters.includes(letter)) {
    letterToCheck.classList.add('button--correct');
  } else {
    letterToCheck.classList.add('button--wrong');
  }
};

const checkLetter = letter => {
  if (secret.toLowerCase().includes(letter)) {
    guessedLetters.push(letter);
  }

  checkLetterInKeyboard(letter);
  writeWord();
};

writeWord();

window.addEventListener('keydown', event => {
  const letter = event.key;
  if (letter.length !== 1 || !regexLetters.test(letter)) return;
  checkLetter(letter);
});

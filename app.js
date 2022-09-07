import fetch from 'node-fetch'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

// Hämta ord modul...
const getWord = async () => { 
    const res = await fetch('https://api.api-ninjas.com/v1/randomword')
    const data = await res.json();
    return data.word;
  }

  const outputWord = async () => {
    const word = await getWord()
    return word
  }


  const genUnderscores = async (word) => {
    let underscores = ''
    for(let i = 0; i < word.length; i++) {
      underscores += '_ '
    }
    return underscores
  }


// output modul
const runApp = async () => {
  const word = await outputWord()
  console.log(word);
  console.log('Welcome to Hangman!')
  console.log('Your word is:')
  const uS = await genUnderscores(word)
  console.log(uS);

  const read = readline.createInterface({ input, output });
  const answer = await read.question('What do you think of Node.js? ');
  console.log(`Thank you for your valuable feedback: ${answer}`);
  read.close();
}



runApp()


// 
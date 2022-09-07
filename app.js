import fetch from 'node-fetch'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

// Hämta ord modul...
const getWord = async () => { 
    const res = await fetch('https://api.api-ninjas.com/v1/randomword')
    const data = await res.json()
    return data.word.toLowerCase()
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

  const play = async (word, underScores) => {
    const read = readline.createInterface({ input, output })
    const numberOfTries = 11
    for (let i = 0; i < numberOfTries; i++ ) {
      const guessRaw = await read.question('Make a letter/word guess: ')
      const guess = guessRaw.toLowerCase()

      if (word.includes(guess)) {
        console.log('good guess')
        const index = word.indexOf(guess)
        let underScoresArr = underScores.split(' ')
        underScoresArr[index] = guess
        underScores = underScoresArr.join(' ')
        console.log(underScores)

      } else {
        console.log('bad guess')
      }

    }
    read.close()
  }

// output modul
const runApp = async () => {
  let word = await outputWord()
  console.log(word);
  console.log('Welcome to Hangman!')
  console.log('Your word is:')
  const underScores = await genUnderscores(word)
  console.log(underScores)
  play(word, underScores)

  // console.log(`Thank you for your valuable feedback: ${answer}`)
  
}



runApp()


// 
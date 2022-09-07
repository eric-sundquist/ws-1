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
    const numberOfTries = word.length + 4
    let lifespan = numberOfTries

    let hasWon = false
    let guessedLetters = ''

    for (let i = 0; i < numberOfTries; i++ ) {
      if (!hasWon) {
        const guessRaw = await read.question(`\nNumber of tries left: ${lifespan}\nGuessed letters: ${guessedLetters}\nMake a letter/word guess: `)
        const guess = guessRaw.toLowerCase()
        guessedLetters += guess + ' '
        lifespan -= 1
  
        for (let j = 0; j < word.length; j++) {
          if (word[j] === guess) {
            let underScoresArr = underScores.split(' ')
            underScoresArr[j] = guess
            underScores = underScoresArr.join(' ')
            
            if (!underScoresArr.includes('_')) {
              hasWon = true
              i = numberOfTries
            }
          }
        }
  
        console.log('\n' + underScores)
      }
    }

    if (hasWon) {
      console.log('\nCongratulations!\n')
    } else {
      console.log('\nYou lost...\n')
    }

    read.close()
  }

  // output modul
  const runApp = async () => {
  let word = await outputWord()

  console.log('Welcome to Hangman!')
  console.log('Your word is:')
  const underScores = await genUnderscores(word)
  console.log(underScores)
  play(word, underScores)
}

runApp()

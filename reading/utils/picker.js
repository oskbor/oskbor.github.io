import shuffle from './shuffle.js'

export default (words, nbrOfWords) => {
  const array = shuffle(Object.values(words))
  return array.sort(
      (a, b) => {
          const shownDiff = a.timesShown - b.timesShown;
          const lastShownDiff = a.lastShown  - b.lastShown 
          return shownDiff || lastShownDiff
      }
  ).map(x => x.word || x.pair)
  .splice(0, nbrOfWords)
}
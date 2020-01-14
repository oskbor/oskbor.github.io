import {render, html} from 'https://unpkg.com/lit-html?module'
import pickWords from './utils/picker.js';
let currentSetIndex = 0;
let askIfProceed = false


export default function read(state, setState) {
    const currentSet = state.activeSets[currentSetIndex];
     if(!currentSet) {
        return html`<button @click=${() => {
            console.log('setting up a new set')
            const words = pickWords(state.words, state.wordsPerSet)
            askIfProceed = false

            setState({activeSets: [...state.activeSets, {
                currentWordIndex: 0,
                words,
                repetitionsDone: 0
            }]})
            }}> Nya ord! </button>`
    }
    else if (askIfProceed) {
        return html`<button @click=${() => {
            askIfProceed = false
            setState({})
            }}> Nya ord! </button>`
    }
    else {
        const currentWord = currentSet.words[currentSet.currentWordIndex];
        setTimeout(function next() {
            const updatedSet = {...currentSet}
            updatedSet.currentWordIndex++

            const isLastWord = updatedSet.currentWordIndex === updatedSet.words.length
            const updatedArray = [...state.activeSets];
            updatedArray.splice(currentSetIndex, 1, updatedSet)
            if (isLastWord) {
                console.log('LAST WORD!!')
                currentSetIndex++
                askIfProceed = true
                updatedSet.repetitionsDone++
                updatedSet.currentWordIndex = 0
                if (updatedSet.repetitionsDone >= state.setRepetitions) {
                    /**
                     *  shift one word and wipe the repetions,
                     *  so that the next time the set contains one new word
                     */
                    const newWord = pickWords(state.words, 1)[0]
                    console.log('set finished, adding new word', newWord)
                    updatedSet.words.shift()
                    updatedSet.words.push(newWord)
                    updatedSet.repetitionsDone = 0
                }

            }
            setState({
                activeSets: updatedArray,
                words: {...state.words, [currentWord]: {...state.words[currentWord], 
                    timesShown: state.words[currentWord].timesShown + 1,
                    lastShown: Date.now()
                }}
            })  
        }, Number(state.timePerWord))
        return html`
        <h1 class="reading words"> ${currentWord} </h1>
        `


    }


}

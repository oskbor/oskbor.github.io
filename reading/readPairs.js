import { html } from 'https://unpkg.com/lit-html?module'
import pick from './utils/picker.js';
let currentSetIndex = 0;
let askIfProceed = false


export default function read(state, setState) {
    const currentSet = state.activeSetsOfPairs[currentSetIndex];
     if(!currentSet) {
        return html`<button @click=${() => {
            console.log('setting up a new set')
            const pairs = pick(state.pairs, state.wordsPerSet)
            askIfProceed = false

            setState({activeSetsOfPairs: [...state.activeSetsOfPairs, {
                currentPairIndex: 0,
                pairs,
                repetitionsDone: 0
            }]})
            }}> Nya par! </button>`
    }
    else if (askIfProceed) {
        return html`<button @click=${() => {
            askIfProceed = false
            setState({})
            }}> Nya par! </button>`
    }
    else {
        const currentPair = currentSet.pairs[currentSet.currentPairIndex];
        setTimeout(function next() {
            const updatedSet = {...currentSet}
            updatedSet.currentPairIndex++

            const isLastPair = updatedSet.currentPairIndex === updatedSet.pairs.length
            const updatedArray = [...state.activeSetsOfPairs];
            updatedArray.splice(currentSetIndex, 1, updatedSet)
            if (isLastPair) {
                console.log('LAST PAIR!!')
                currentSetIndex++
                askIfProceed = true
                updatedSet.repetitionsDone++
                updatedSet.currentPairIndex = 0
                if (updatedSet.repetitionsDone >= state.setRepetitions) {
                    /**
                     *  shift one word and wipe the repetions,
                     *  so that the next time the set contains one new word
                     */
                    const newPair = pick(state.pairs, 1)[0]
                    console.log('set finished, adding new pair', newPair)
                    updatedSet.pairs.shift()
                    updatedSet.pairs.push(newPair)
                    updatedSet.repetitionsDone = 0
                }

            }
            setState({
                activeSetsOfPairs: updatedArray,
                pairs: {...state.pairs, [currentPair]: {...state.pairs[currentPair], 
                    timesShown: state.pairs[currentPair].timesShown + 1,
                    lastShown: Date.now()
                }}
            })  
        }, Number(state.timePerPair))
        return html`
        <h1 class="reading pairs"> ${currentPair} </h1>
        `


    }


}

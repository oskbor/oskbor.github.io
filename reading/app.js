import {render, html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

import Settings from './settings.js'
import Welcome from './welcome.js'
import ReadWords from './readWords.js'
import ReadPairs from './readPairs.js'
import Stats from './stats.js'
import shuffle from './utils/shuffle.js'

const defaults = {
    view: 'welcome',
    wordsPerSet: 5,
    setRepetitions: 3,
    timePerWord: 1000,
    timePerPair: 1500,
    activeSets: [],
    activeSetsOfPairs: [],
    words: {},
    pairs: {},
}

async function main() {
    let state =  localStorage.getItem('state') ?
        {...defaults, ...JSON.parse(localStorage.getItem('state')), view: 'welcome'} :
        defaults

    
    function setState(patch) {
        state = Object.assign(state, patch)
        localStorage.setItem('state', JSON.stringify(state))
        console.log(state)
        // avoid weird race conditions in event handlers
        setTimeout(() =>renderApp(state), 0)
    }
    
    function renderApp() {
        let view
        if (state.view === 'settings') {
            view = Settings(state, setState)
        }
        else if(state.view ==='welcome') {
            view = Welcome(state, setState)
        }
        else if(state.view === 'stats') {
            view = Stats(state, setState)
        }
        else if(state.view === 'pairs') {
            view = ReadPairs(state, setState)
        }
        else {
            view = ReadWords(state, setState)
        }
        return render(view, document.getElementById('app'))
    }
    const wordMapper = (w, i) =>({
        word: w,
        index: i,
        timesShown: state.words[w] ? state.words[w].timesShown : 0,
        lastShown: state.words[w] ? state.words[w].lastShown : 0
    })
    const pairMapper = (p, i) =>({
        pair: p,
        index: i,
        timesShown: state.pairs[p] ? state.pairs[p].timesShown : 0,
        lastShown: state.pairs[p] ? state.pairs[p].lastShown : 0
    })
    const words = await fetch('./words.txt')
        .then(res => res.text())
        .then(words => words.split('\n'))
        .then(shuffle)
        .then(words => words
            .filter(a => a)
            .map(wordMapper)
            .reduce((acc, curr) => ({[curr.word]: curr, ...acc}), {}))
    
    const pairs = await fetch('./pairs.txt')
        .then(res => res.text())
        .then(pairs => pairs.split('\n'))
        .then(shuffle)
        .then(pairs => pairs
            .filter(a => a)
            .map(pairMapper)
            .reduce((acc, curr) => ({[curr.pair]: curr, ...acc}), {}))

    setState({words, pairs})
}

main()

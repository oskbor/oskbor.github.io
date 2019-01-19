import {render, html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

import Settings from './settings.js'
import Welcome from './welcome.js'
import Read from './read.js'
import Stats from './stats.js'
import shuffle from './shuffle.js'


async function main() {
    let state =  localStorage.getItem('state') ? {...JSON.parse(localStorage.getItem('state')), view: 'welcome'} : {
        view: 'welcome',
        wordsPerSet: 5,
        setRepetitions: 3,
        timePerWord: 1000,
        activeSets: [],
        words: {}
    }
    
    function setState(patch) {
        state = Object.assign(state, patch)
        localStorage.setItem('state', JSON.stringify(state))
        console.log(state)
        // avoid wierd race conditions in event handlers
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
        else {
            view = Read(state, setState)
        }
        return render(view, document.getElementById('app'))
    }
    const wordMapper = (w, i) =>({
        word: w,
        index: i,
        timesShown: state.words[w] ? state.words[w].timesShown : 0,
        lastShown: state.words[w] ? state.words[w].lastShown : 0
    })
    const words = await fetch('./words.txt')
      .then(res => res.text())
      .then(words => words.split('\n'))
      .then(shuffle)
      .then(words => words
        .filter(a => a)
        .map(wordMapper)
        .reduce((acc, curr) => ({[curr.word]: curr, ...acc}), {}))
    setState({words})
}

main()

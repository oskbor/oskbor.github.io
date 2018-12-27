import {render, html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

const WORDS_PER_SESSION = 5
const SESSION_REPETIONS = 3;

function renderApp(word) {
    const app = html`
    <h1> ${word} </h1>
    `
    render(app, document.getElementById('app'))
}
const wait = (time) => new Promise(res => setTimeout(res, time));
let looping = true;

document.addEventListener('visibilitychange', () => {
    if(document.hidden) {
        console.log('EXITING! lost visibility')
        looping = false;
    }
})


async function main() {
    const words = await fetch('./words.txt')
      .then(res => res.text())
      .then(words => words.split('\n'))
    while(looping) {
        const iteration = Number(localStorage.getItem('iteration')) || 0;
        const start = Math.floor(iteration / (SESSION_REPETIONS * WORDS_PER_SESSION))
        const mod = iteration % (SESSION_REPETIONS * WORDS_PER_SESSION);
        if (mod === 0 && iteration > 0) {
            renderApp()
            await wait(9000)
        }
        else if (mod % WORDS_PER_SESSION === 0 && iteration > 0) {
            renderApp()
            await wait(1000)
        }
        const word = words[start + mod % WORDS_PER_SESSION];
        console.log('start', start, 'mod', mod, 'mod % WORDS_PER_SESSION', mod % WORDS_PER_SESSION, word)
        if (word) {
            renderApp(word)
            await wait(1000)
            localStorage.setItem('iteration', iteration + 1);
        }
        else {
            console.log('EXITING, no more words');
            looping = false;
        }
        
    }

}

main()

import {html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

export default async function stats(state, setState) {
    const onClick = (e) => {
        const view = 'welcome';
        setState({view})
    } 
    const learnedWords = await fetch('./learned_words.txt')
        .then(res => res.text())
    console.log(learnedWords);
    return html`
    <div class="stats">
      <h2> Lärda ord </h2>
      <pre>
        ${'\n' + learnedWords}
+++++
        ${'\n' + Object.values(state.words)
          .filter( w=> w.timesShown >= 15)
          .map(w => w.word)
          .join('\n')}
      </pre>

      <h2> Statistik </h2>
      <pre>${JSON.stringify(state, null , 2)}</pre>
      <button name="welcome" @click=${onClick}> Tillbaka </button>

    </div>
    `

}

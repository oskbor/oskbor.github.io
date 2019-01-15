import {html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

export default function settings(state, setState) {
    const onClick = (e) => {
        const view = e.target.name;
        setState({view})
    } 
    return html`
    <div class="welcome">
      <h2> Lär dig läsa </h2>
      <button name="settings" @click=${onClick}> Inställningar </button>
      <button name="reading" @click=${onClick}> Börja </button>
    </div>
    `

}
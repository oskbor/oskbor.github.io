import { render, html } from "https://unpkg.com/lit-html?module";

export default function settings(state, setState) {
    const onClick = (e) => {
        const view = e.target.name;
        setState({view})
    } 
    return html`
    <div class="welcome">
      <h2> Lär dig läsa </h2>
      <button name="settings" @click=${onClick}> Inställningar </button>
      <button name="reading" @click=${onClick}> Ord </button>
      <button name="pairs" @click=${onClick}> Ordpar </button>
      <button name="stats" @click=${onClick}> Statistik </button>
      <button name="story" @click=${onClick}> Sagor </button>
    </div>
    `

}
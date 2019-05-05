import {html} from 'https://unpkg.com/lit-html@0.14.0/lit-html.js'

export default function settings(state, setState) {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {};
        for (let i = 0, ii = document.settings.length; i < ii; ++i) {
            const input = document.settings[i];
            if (input.name) {
            data[input.name] = input.value;
            }
        }
        setState({...data, view: 'welcome'})
    } 
    return html`
    <form class="settings" @submit=${onSubmit} name="settings">
      <label><input name="wordsPerSet" value="${state.wordsPerSet}" type="number"/> ord per omgång. </label>
      <label>Repetera varje set <input name="setRepetitions" value="${state.setRepetitions}" type="number"/> gånger. </label>
      <label><input name="timePerWord" value="${state.timePerWord}" type="number"/> ms per ord </label>
      <label><input name="timePerPair" value="${state.timePerPair}" type="number"/> ms per ordpar </label>

      <button type="submit">Spara</button>
    </form>
    `

}
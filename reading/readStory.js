import { LitElement, html } from 'https://unpkg.com/@polymer/lit-element?module';


class Stories extends LitElement {
  static get properties() {
    return { name: { type: String } };
  }

  constructor() {
    super();
    this.name = 'World';
  }
  
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

customElements.define('read-stories', Stories);

export default function read(state, setState) {
  return html`<h1>OOO</h1>`
}

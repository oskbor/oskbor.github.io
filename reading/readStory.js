import { html } from 'https://unpkg.com/lit-html?module';
import 'https://unpkg.com/macro-carousel'

export default function read(state, setState) {
  return html`<macro-carousel>
  <article class="slide">Slide 1</article>
  <article class="slide">Slide 2</article>
  <article class="slide">Slide 3</article>
  <article class="slide">Slide 4</article>
  <article class="slide">Slide 5</article>
  <article class="slide">Slide 6</article>
</macro-carousel>`
}

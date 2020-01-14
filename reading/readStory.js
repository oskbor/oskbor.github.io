import { html } from 'https://unpkg.com/lit-html?module'
import 'https://unpkg.com/macro-carousel'
import {
  component,
  useState,
  useEffect
} from 'https://unpkg.com/haunted?module'
import auth from './google-sheets/authenticate.js'
import loadClient from './google-sheets/load-client.js'
import getStories from './google-sheets/get-stories.js'

export default function read(state, setState) {
  return html`
    <my-stories></my-stories>
  `
}

function ListStories() {
  const [loading, setLoading] = useState(true)
  const [stories, setStories] = useState([])
  const [selectedStory, setSelectedStory] = useState(null)
  useEffect(() => {
    auth()
      .then(loadClient)
      .then(getStories)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => setStories(res))
      .finally(() => setLoading(false))
  }, [])
  if (loading) {
    return html`
      loading....
    `
  } else if (stories.length === 0) {
    return html`
      No stories found :(
    `
  } else if (!selectedStory) {
    return html`
      <ul>
        ${stories.map(
          s => html`
            <li @click=${() => setSelectedStory(s)}>
              ${s.title}
            </li>
          `
        )}
      </ul>
    `
  }
  return html`
    <a-story .pages=${selectedStory.pages} />
  `
}

customElements.define('my-stories', component(ListStories))

function Story({ pages }) {
  return html`
    <macro-carousel>
      ${pages.map(
        textOrUrl =>
          html`
            <article class="slide">
              ${textOrUrl.startsWith('http')
                ? html`
                    <img src=${textOrUrl.replace('/open?', '/uc?')} />
                  `
                : html`
                    <span>${textOrUrl}</span>
                  `}
            </article>
          `
      )}
    </macro-carousel>
  `
}

//Story.observedAttributes = ['pages']

customElements.define('a-story', component(Story))

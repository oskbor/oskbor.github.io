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
      ...
    `
  } else if (stories.length === 0) {
    return html`
      No stories found :(
    `
  } else if (!selectedStory) {
    return html`
      <style>
        li {
          cursor: pointer;
        }
      </style>
      <ul>
        ${stories.map(
          s => html`
            <li
              style="font-size:${Math.floor(160 / (s.title.length + 1))}vw;"
              @click=${() => setSelectedStory(s)}
            >
              ${s.title}
            </li>
          `
        )}
      </ul>
    `
  }
  return html`
    <a-story
      .pages=${selectedStory.pages}
      .onDone=${() => setSelectedStory(null)}
    />
  `
}

customElements.define('my-stories', component(ListStories))

function Story({ pages, onDone }) {
  return html`
    <style>
      article {
        display: flex;
        width: 100vw;
      }
      article div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
      }
      article img {
        max-width: 100vw;
        max-height: 100vh;
        min-height: 20vh;
        min-width: 20vw;
        background-color: #cccccc;
      }
    </style>
    <macro-carousel style="--macro-carousel-slide-min-height: 100vh">
      ${pages.map(
        textOrUrl =>
          html`
            <article class="slide">
              <div>
                ${textOrUrl.startsWith('http')
                  ? html`
                      <img src=${textOrUrl.replace('/open?', '/uc?')} />
                    `
                  : html`
                      <span
                        style="font-size:${Math.floor(
                          160 / (textOrUrl.length + 1)
                        )}vw;"
                        >${textOrUrl}</span
                      >
                    `}
              </div>
            </article>
          `
      )}
      <article class="slide" @click=${onDone}>
      <div ><span  style="font-size: 20vw;">slut</span></div>
    </macro-carousel>
  `
}

//Story.observedAttributes = ['pages']

customElements.define('a-story', component(Story))

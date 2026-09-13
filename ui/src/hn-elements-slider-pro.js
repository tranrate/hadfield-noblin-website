import SliderPro from './slider-pro/core/slider-pro.js';
import Arrows from './slider-pro/add-ons/arrows/arrows.js';
import Autoplay from './slider-pro/add-ons/autoplay/autoplay.js';
import Layers from './slider-pro/add-ons/layers/layers.js';
import Fullscreen from './slider-pro/add-ons/fullscreen/fullscreen.js';
import Keyboard from './slider-pro/add-ons/keyboard/keyboard.js';
import TouchSwipe from './slider-pro/add-ons/touch-swipe/touch-swipe.js';

customElements.define(
  "hn-projects",
  class extends HTMLElement {
    constructor() {
      super();
      const content = document.getElementById("slider-template").content;
      this.attachShadow({ mode: "open" }).appendChild(document.importNode(content, true));
    }
    async connectedCallback() {
      var sp;
      const slides = this.shadowRoot.querySelector("#slides");
      const slideContent = document.getElementById("slide-template").content;
      const projects = document.getElementById("projects");
      const spEl = this.shadowRoot.querySelector("#slider-pro");
      fetch("./public/projects.json")
        .then((response) => response.text())
        .then((responseText) => {
          JSON.parse(responseText,
            (key, value) => {
              switch (key) {
                case "desc":
                case "path":
                  return value;
                case "":
                  const viewport = window.visualViewport;
                  sp = new SliderPro(spEl, {
                    addOns: [ Arrows, Autoplay, Layers, Fullscreen, Keyboard, TouchSwipe ],
                    width: viewport.width -16,
                    height: viewport.height - 80,
                    orientation: viewport.width > viewport.height - 64 ? 'horizontal' : 'vertical',
                    visibleSize: '100%',
                    aspectRatio: NaN,
                    imageScaleMode: 'contain',
                    autoSlideSize: true,
                    fullscreen: true,
                    arrows: true,
                  });
                  window.visualViewport.addEventListener("resize", (e) => {
                    sp.settings.height = viewport.height - 80;
                    sp.settings.width = viewport.width - 16;
                    const orientation = viewport.width > viewport.height - 64 ? 'horizontal' : 'vertical';
                    if ( orientation !== sp.settings.orientation ) {
                      sp.settings.orientation = orientation;
                      sp.update();
                    } else {					
                      sp.resize();
                    };
                  });
                  return;
                default:
                  const slide = slideContent.cloneNode(true);
                  slide.querySelector("img").setAttribute("src", "./public/" + value.path);
                  slide.querySelector("p").textContent = value.desc;
                  slides.appendChild(slide);
                  return;
              }
          })
        });
    }
  }
)

document.getElementById("mail").addEventListener("click", (e) => {
  var m = document.createElement("a");
  const u = "architects"
  const d = "hadfield-noblin.com";
  m.href = `mailto:${u}@${d}`;
  m.click();
})

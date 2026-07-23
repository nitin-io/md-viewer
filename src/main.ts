import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import './style.css'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``
declare const __APP_VERSION__: string;
console.log(`.md Viewer\nVersion: ${__APP_VERSION__}\nGitHub: https://github.com/nitin-io/md-viewer`);
const versionElement = document.querySelector('.version span') as HTMLSpanElement;
versionElement.setAttribute('aria-label', `Version: ${__APP_VERSION__}`);
versionElement.textContent = `v${__APP_VERSION__}`;

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const markdownContent = document.getElementById('markdownContent') as HTMLDivElement;
const openFileButton = document.getElementById('openFileButton') as HTMLButtonElement;
const mainMenu = document.getElementById('mainMenu') as HTMLDivElement;

openFileButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    openFileButton.hidden = true;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const markdown = e.target?.result as string;
      const htmlContent = await marked(markdown);
      markdownContent.innerHTML = htmlContent;
      mainMenu.style.display = 'none';
    };
    reader.readAsText(file);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}
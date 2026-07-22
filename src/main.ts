import { marked } from 'marked';
import './style.css'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const markdownContent = document.getElementById('markdownContent') as HTMLDivElement;
const openFileButton = document.getElementById('openFileButton') as HTMLButtonElement;

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
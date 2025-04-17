import Toast from './Toast/Toast'
import './Toast/Toast.css'
import './style.css'

let submitButton = document.querySelector('.button')
let copyButton = document.querySelector('.copy-button')
let toastConfig = {
  text: 'Успешно скопировано.',
  color: '#28a745',
  autohide: true,
  delay: 2000
}

submitButton.addEventListener('click', formSubmit, false)
copyButton.addEventListener('click', function() {
  let paragraph = document.querySelector('.output-text')
  let text = paragraph.textContent
  copyToClipboard(text)
  Toast.add(toastConfig)
})

function formSubmit() {
  let text = prepareText()
  printText(text)
  addCopyButton()
  onSpanClickHandler()
}

function prepareText() {
  let numberRegex = /\d{2}-\d{8}/gm;
  let sourceText = document.querySelector('#text').value.match(numberRegex);

  if (sourceText) {
    sourceText = sourceText.map(item => item.replace(/^0+|-0*/g, ''));
  }

  return sourceText;
}

function printText(text) {
  let paragraph = document.querySelector('.output-text')
  
  paragraph.innerHTML = ''
  
  for(let item in text) {
    let span = document.createElement('span')
    span.classList.add('invoice-number')

    span.setAttribute('data-number', text[item])
    if(item < text.length - 1) {
      span.innerHTML = `${text[item]}, `
    } else span.innerHTML = `${text[item]}`
    paragraph.appendChild(span)
  }
}

function onSpanClickHandler() {
  let spans = document.querySelectorAll('span')

  for(let span of spans) {
    span.onclick = function() {
      for(let siblings of spans) {
        siblings.classList.remove('active')
      }
      this.classList.toggle('active')
      let invoiceNumber = this.dataset.number
      copyToClipboard(invoiceNumber)
      Toast.add(toastConfig)
    }
  }

}

function addCopyButton() {
  let copyButton = document.querySelector('.copy-button')
  

  copyButton.style.display = 'inline-block'
}

function copyToClipboard(textToCopy) {
  let el = document.createElement('textarea')
  
  el.value = textToCopy
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

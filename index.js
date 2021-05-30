function formSubmit() {
  let text = prepareText()
  printText(text)
  addCopyButton()
}

function prepareText() {
  let separator = /[\n | \s]/gm
  let bracketedText = /\(.+\)/
  let comma = /,/
  let sourceText = document.querySelector('#text').value.split(separator)
  
  for(let i in sourceText) {
    if(sourceText[i] === 'Наряд') {
      sourceText.splice(i, 1)
    }
  }

  for(let i in sourceText) {
    if(bracketedText.test(sourceText[i])) {
      sourceText.splice(i, 1)
    }
  }

  for(let i in sourceText) {
    if(comma.test(sourceText[i])) {
      sourceText[i] = sourceText[i].replace(comma, '')
    }
  }

  return sourceText.join(', ')
}

function printText(text) {
  let paragraph = document.querySelector('.output-text')
  paragraph.innerHTML = text
}

function addCopyButton() {
  let copyButton = document.querySelector('.copy-button')
  copyButton.style.display = 'inline-block'
  copyButton.addEventListener('click', copyToClipboard, false)
}

function copyToClipboard() {
  let el = document.createElement('textarea')
  let paragraph = document.querySelector('.output-text')
  el.value = paragraph.textContent
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

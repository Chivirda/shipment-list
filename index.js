function formSubmit() {
  let text = prepareText()
  printText(text)
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
